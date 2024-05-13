import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.service as _service
from auth.model import UserModel #, VisitorModel
from sqlalchemy import create_engine, inspect
import os
from auth.model import UserModel

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
async def create_user(request: Request):
    """Request should pass in a JSON object containing the following fields
    {
        "username": USERNAME,
        "email": EMAIL,
        "password": PASSWORD,
        "first_name": FIRSTNAME,
        "last_name": LASTNAME
    }"""
    data = await request.json()
    return await _service.create_user(engine, data)