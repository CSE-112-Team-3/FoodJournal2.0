import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.service as _service
from auth.model import UserModel #, VisitorModel
from service_database import get_db

router_auth = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)

@router_auth.post("/create_user")
async def create_user(user: _schemas.UserBase, db: Session = Depends(get_db)):
    """ 
    Create a new user in the databse. Endpoint receives
    a JSON string with user information. To test the endpoint you can create a JSON file
    and run `curl -X POST http://0.0.0.0:6542/user -H "Content-Type: application/json" -d @<filename>`
    """
    return await _service.create_user(user, db)
  
  

@router_auth.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """ 
    Login endpoint receives a JSON string with user information. 
    To test the endpoint you can create a JSON file    
    and run `curl -X POST http://0.0.0.0:6542/user -H "Content-Type: application/json" -d @<filename>`
    """
    return await _service.login(request, db)

@router_auth.patch("/update_user")
async def update_user(request: _schemas.UpdateUserBase, accessToken: str, db: Session = Depends(get_db)):
    return await _service.update_user(request, accessToken, db)