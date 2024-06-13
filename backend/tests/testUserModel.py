import os
from datetime import datetime
from fastapi import APIRouter
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.pool import StaticPool
from sqlalchemy.exc import IntegrityError
from backend import database
from auth.model import UserModel
from auth.service import get_user_by_access_token, get_user_by_id
from dotenv import load_dotenv

load_dotenv()

# SQLAlchemy setup
DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

# Dependency override for testing
def override_get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

# Initialize the test client with the FastAPI app
app = APIRouter()
client = TestClient(app)
database.get_db = override_get_db

class TestUserModel:

    def setup_method(self):
        self.session = SessionLocal()

        # Sample data for testing
        self.valid_user1 = UserModel(
            first_name='Thomas',
            last_name='Powell',
            username='tpowell',
            password='pass',
            email='tpowell@foodjournal.com'
        )
        self.valid_user2 = UserModel(
            first_name='Bob',
            last_name='Jean',
            username='bjean',
            password='password',
            email='bjean@gmail.com'
        )
        self.valid_user3 = UserModel(
            first_name='Joe',
            last_name='Bob',
            username='joebob',
            password='joebobpass',
            email='joebob@gmail.com'
        )
        self.invalid_user1 = UserModel(
            first_name='NoLast',
            username='nolastname',
            password='nolast',
            email='nolast@nolast.com'
        )

        self.session.add(self.valid_user1)
        self.session.add(self.valid_user2)
        self.session.add(self.valid_user3)
        self.session.commit()

    def teardown_method(self):
        self.session.rollback()
        self.session.close()
        Base.metadata.drop_all(bind=engine)

    def test_user_valid(self):
        query_result = self.session.query(UserModel).filter_by(last_name='Powell').first()
        assert query_result.first_name == 'Thomas'
        assert query_result.last_name == 'Powell'
        assert query_result.username == 'tpowell'
        assert query_result.email == 'tpowell@foodjournal.com'

    def test_user_invalid(self):
        try:
            self.session.add(self.invalid_user1)
            self.session.commit()
        except IntegrityError:
            self.session.rollback()

        query_result = self.session.query(UserModel).filter_by(first_name='NoLast').first()
        assert query_result is None

    def test_add_delete_same_user(self):
        query_result = self.session.query(UserModel).filter_by(last_name='Jean').first()
        assert query_result is not None

        self.session.delete(query_result)
        self.session.commit()

        query_result = self.session.query(UserModel).filter_by(last_name='Jean').first()
        assert query_result is None

    def test_create_user(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": "testuser",
            "password": "testuserpass",
            "email": "testuser@gmail.com"
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        json_response = response.json()
        user = json_response["user"]
        assert user["first_name"] == user_data["first_name"]
        assert user["last_name"] == user_data["last_name"]
        assert user["username"] == user_data["username"]
        assert user["email"] == user_data["email"]

    def test_create_user_duplicate_email(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": "testuser",
            "password": "testuserpass",
            "email": self.valid_user1.email
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": f"Email {user_data['email']} already exists"}

    def test_create_user_invalid_email(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": "testuser",
            "password": "testuserpass",
            "email": "invalid_email"
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": "Invalid email address"}

    def test_create_user_duplicate_username(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": self.valid_user1.username,
            "password": "testuserpass",
            "email": "testuser@gmail.com"
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": f"User {user_data['username']} already exists"}

    def test_login(self):
        login_data = {
            "username": self.valid_user1.username,
            "password": self.valid_user1.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        assert json_response["token_type"] == "bearer"
        user_id = json_response["user_id"]
        user = self.session.query(UserModel).filter_by(id=user_id).first()
        assert user.email == self.valid_user1.email

    def test_invalid_username_login(self):
        invalid_login_data = {
            "username": "fakeUser",
            "password": "fakePass"
        }
        response = client.post("/api/v1/auth/login", data=invalid_login_data)
        assert response.status_code == 401
        assert response.json() == {"detail": "Invalid email or username, try again."}

    def test_invalid_password_login(self):
        invalid_pass = {
            "username": self.valid_user1.username,
            "password": "fakePass"
        }
        response = client.post("/api/v1/auth/login", data=invalid_pass)
        assert response.status_code == 401
        assert response.json() == {"detail": "Invalid password, try again."}

    def test_no_update_data(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response["access_token"]

        update_data = {}
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 400
        assert update_response.json() == {"detail": "No fields to update"}

    # test if duplicate email when creating user
    def test_create_user_duplicate_email(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": "testuser",
            "password": "testuserpass",
            "email": self.valid_user1.email
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": f"Email {user_data['email']} already exists"}

    # test if email is valid when creating user
    def test_create_user_invalid_email(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": "testuser",
            "password": "testuserpass",
            "email": "invalid_email"
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": "Invalid email address"}

    # test if duplicate username when creating user
    def test_create_user_duplicate_username(self):
        user_data = {
            "first_name": "Test",
            "last_name": "User",
            "username": self.valid_user1.username,
            "password": "testuserpass",
            "email": "testuser@gmail.com"
        }
        response = client.post("/api/v1/auth/create_user", json=user_data)
        assert response.status_code == 400
        json_response = response.json()
        assert json_response == {"detail": f"User {user_data['username']} already exists"}

    # test if valid user is able to login
    def test_login(self):
        login_data = {
            "username": self.valid_user1.username,
            "password": self.valid_user1.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        assert response.status_code == 200
        json_response = response.json()
        assert "access_token" in json_response
        assert json_response["token_type"] == "bearer"
        assert json_response["user_id"] == self.valid_user1.id
        assert json_response["email"] == self.valid_user1.email

    # test if invalid username is unable to login
    def test_invalid_username_login(self):
        invalid_login_data = {
            "username": "fakeUser",
            "password": "fakePass"
        }
        response = client.post("/api/v1/auth/login", data=invalid_login_data)
        assert response.status_code == 401
        assert response.json() == {"detail": "Invalid email or username, try again."}

    # test if invalid password is unable to login
    def test_invalid_password_login(self):
        invalid_pass = {
            "username": self.valid_user1.username,
            "password": "fakePass"
        }
        response = client.post("/api/v1/auth/login", data=invalid_pass)
        assert response.status_code == 401
        assert response.json() == {"detail": "Invalid password, try again."}

    # test update user if no update data provided
    def test_no_update_data(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response["access_token"]

        update_data = {}
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 400
        assert update_response.json() == {"detail": "No fields to update"}

    # test update user if update email already exists in db
    def test_duplicate_update_email(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response.get("access_token")

        update_data = {
            "email": self.valid_user1.email
        }
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 400
        assert update_response.json() == {"detail": f'Email {update_data["email"]} already exists'}

    # test update user if update email is invalid
    def test_invalid_update_email(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response.get("access_token")

        update_data = {
            "email": "invalidEmail"
        }
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 400
        assert update_response.json() == {"detail": f'Invalid email address'}

    # test update user if update username already exists in db
    def test_duplicate_update_username(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response.get("access_token")

        update_data = {
            "username": self.valid_user1.username
        }
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 400
        assert update_response.json() == {"detail": f'User {update_data["username"]} already exists'}

    # test update user works for valid input
    def test_update_user(self):
        login_data = {
            "username": self.valid_user3.username,
            "password": self.valid_user3.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response.get("access_token")

        update_data = {
            "first_name": "JoeBob",
            "last_name": "Joe",
            "username": "joebobjoe"
        }
        headers = {
            "Authorization": f'Bearer {token}'
        }
        update_response = client.patch("/api/v1/auth/update_user", json=update_data, headers=headers)
        assert update_response.status_code == 200
        assert update_response.json() == {"message": "User was updated"}

        updated_user = self.session.query(UserModel).filter_by(last_name='Joe').first()
        assert updated_user.first_name == update_data["first_name"]
        assert updated_user.last_name == update_data["last_name"]
        assert updated_user.username == update_data["username"]

    # test get user by id
    def test_get_user_by_id(self):
        id = self.session.query(UserModel).filter_by(last_name='Powell').first().id
        username = get_user_by_id(id, self.session)
        assert username == self.valid_user1.username

    # test get user by access token
    def test_get_user_by_access_token(self):
        login_data = {
            "username": self.valid_user1.username,
            "password": self.valid_user1.password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        json_response = response.json()
        assert "access_token" in json_response
        token = json_response["access_token"]
        
        user = get_user_by_access_token(token, self.session)
        expected_user = self.session.query(UserModel).filter_by(last_name='Powell').first()
        assert user == expected_user

    # Cleanup
    def teardown_class(self):
        self.session.rollback()
        self.session.close()
        Base.metadata.drop_all(bind=engine)