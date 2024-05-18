import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.service as _service
from auth import models as _model
from service_database import get_db
from sqlalchemy import create_engine, inspect
import os

router_auth_su = APIRouter()

# Load environment variables (if using .env file)
from dotenv import load_dotenv
load_dotenv()

# Connection details
DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'

# Create the engine and test connection
engine = create_engine(DATABASE_URL)
print(engine)

# router connects main with service
@router_auth_su.post("/user")
async def create_user(user: _schemas.UserBase):
    """ Create a new user in the databse. Endpoint receives
    a JSON string with user information. To test the endpoint you can create a JSON file
    and run `curl -X POST http://0.0.0.0:6542/user -H "Content-Type: application/json" -d @<filename>`"""
    return await _service.create_user(engine, user)
  
  
router_auth = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)

@router_auth.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return await _service.login(request, db)
