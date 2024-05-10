import datetime
from fastapi import APIRouter, Depends, HTTPException, status
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.src.service as _service
from auth.src.model import UserModel
from sqlalchemy import create_engine, inspect
import os

router_auth = APIRouter(
    prefix="/auth/src",
    tags=["Auth"]
)

'''
router_auth = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)
'''

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
    user = {"username": "mreta", "password": "sexy", "email": "mreta@ucsd.edu"}
    print("Helloooo")
    '''
    user.username = "mreta"
    user.password = "sexy"
    user.email = "mreta@ucsd.edu"
    user.id = 1
    user.created_at = datetime.datetime.now()
    user.first_name = "Marc"
    user.last_name = "Reta"
    '''
    return await _service.create_user(Session(engine), user)

