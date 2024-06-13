from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from post_review.model import PostReviewModel
from post_review.service import get_posts, delete_post_review, update_post_review, create_post_review
from auth.utils import create_access_token
from backend import database
from schemas import PostReviewBase
import os
from main import app
from dotenv import load_dotenv

# Override the get_db dependency to use the test database
def override_get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[database.get_db] = override_get_db

# Initialize the test client with the FastAPI app
client = TestClient(app)


class testPostModel():

    def setup_class(self):
        # Load environment variables (if using .env file)
        load_dotenv()

        DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        Base = declarative_base()

        Base.metadata.create_all(engine)
        self.session = SessionLocal()
        self.valid_post1 = PostReviewModel(
            post_id=1,
            food_name='burrito',
            restaurant_name='taco stand',
            rating=5,
            review='super good tortilla',
            tags='mexican food'
        )
        self.valid_post2 = PostReviewModel(
            post_id=1,
            food_name='pizza',
            restaurant_name='Regents Pizza',
            rating=2,
            review='funky cheese',
            tags='pizza'
        )
        self.valid_post3 = PostReviewBase()
        self.valid_post3.food_name = 'sushi'
        self.valid_post3.restaurant_name = 'sushi place'
        self.valid_post3.rating = 4
        self.valid_post3.review = 'good fish'
        self.valid_post3.tags = 'japanese food'

    def test_get_post(self):
        self.session.add(self.valid_post1)
        self.session.commit()
        query_result = get_posts(self.session)
        query_result = query_result[0]

        assert query_result.food_name == 'burrito'
        assert query_result.restaurant_name == 'taco stand'
        assert query_result.rating == 5
        assert query_result.review == 'super good tortilla'
        assert query_result.tags == 'mexican food'

    def test_delete_post(self):
        # Access token creds should be replaced with actual user creds
        token = create_access_token(
                            data={
                                "email": 'test1@gmail.com',
                                "user_id": str(1)
                            },
                        )

        before = len(self.session.query(PostReviewModel).all())
        delete_post_review(1, self.session, token)
        posts = self.session.query(PostReviewModel).all()
        assert len(posts) == before - 1

    def test_update_post(self):
        # Test update functionality
        token = create_access_token(
                            data={
                                "email": 'test1@gmail.com',
                                "user_id": str(1)
                            })
        update_post_review(self.valid_post3, self.session, token, 3)
        posts = self.session.query(PostReviewModel).all()
        assert posts[1].food_name == 'sushi'

    def test_update_doesnt_exist(self):
        # Test update functionality
        token = create_access_token(
                            data={
                                "email": 'test1@gmail.com',
                                "user_id": str(1)
                            })
        ud = {
            "post_review": None, 
            "access_token": token,
            "id": 4,
            "db": self.session
        }
        client.post("/api/v1/post_review/update_post_review", data=ud)
        assert client.response.status_code == 400


    def test_create_post(self):
        # Test creating post functionality
        token = create_access_token(
                            data={
                                "email": 'test1@gmail.com',
                                "user_id": str(1)
                            })
        before = len(self.session.query(PostReviewModel).all())
        create_post_review(self.valid_post3, self.session, token)
        assert len(self.session.query(PostReviewModel).all()) == before + 1
        posts = self.session.query(PostReviewModel).all()
        assert posts[-1].food_name == 'sushi'
        assert posts[-1].restaurant_name == 'sushi place'
        
    def teardown_class(self):
        self.session.rollback()
        self.session.close()