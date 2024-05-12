import datetime
from fastapi import APIRouter, Depends, HTTPException, status
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.src.service as _service
from auth.src.model import UserModel #, VisitorModel
from sqlalchemy import create_engine, inspect
import os

router_auth = APIRouter()

# Load environment variables (if using .env file)
from dotenv import load_dotenv
load_dotenv()

# Connection details
DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'

# Create the engine and test connection
engine = create_engine(DATABASE_URL)
print(engine)

# router connects main with service
@router_auth.post("/user")
async def create_user():
    user = {"username": "mreta",
            "password": "sexy",
            "email": "mreta@ucsd.edu", 
            "id" : 1,
            "created_at" : datetime.datetime.now(),
            "first_name" : "Marc",
            "last_name" : "Reta"}

    '''
    user = UserModel(username = "mreta",
                     password = "sexy",
                     email = "mreta@ucsd.edu",
                     id = 1,
                     created_at = datetime.datetime.now(),
                     first_name = "Marc",
                     last_name = "Reta")
    '''

    return await _service.create_user(engine, user)

'''
@router_auth.post("/login")
async def login(visitor):
    # visitor = {"email": "mreta@ucsd.edu", "password": "sexy"}

    visitor.password = "sexy"
    visitor.email = "mreta@ucsd.edu"

    return await _service.login(engine, visitor)

@router_auth.post("/logout")
async def login(visitor):
    # visitor = {"email": "mreta@ucsd.edu", "password": "sexy"}

    visitor.password = "sexy"
    visitor.email = "mreta@ucsd.edu"

    return await _service.logout(engine, visitor)
'''
