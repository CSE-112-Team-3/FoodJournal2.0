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
    Create a new user in the database.

    Args:
        user (_schemas.UserBase): The user information to create.
        db (Session, optional): The database session. Defaults to the session obtained from the `get_db` dependency.

    Returns:
        Awaitable[dict]: A dictionary indicating whether the user was successfully created.
    """
    return await _service.create_user(user, db)
  
  

@router_auth.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Endpoint for user login.

    Args:
        request (OAuth2PasswordRequestForm): The request object containing user credentials.
        db (Session): The database session.

    Returns:
        The result of the login service function.
    """
    return await _service.login(request, db)

@router_auth.patch("/update_user")
async def update_user(request: _schemas.UpdateUserBase, accessToken: str, db: Session = Depends(get_db)):
    """
    Update the user information in the database.

    Args:
        request (_schemas.UpdateUserBase): The updated user information.
        accessToken (str): The access token of the user making the request.
        db (Session, optional): The database session. Defaults to the session obtained from the `get_db` dependency.

    Returns:
        Awaitable[dict]: A dictionary indicating whether the user was successfully updated.
    """
    return await _service.update_user(request, accessToken, db)