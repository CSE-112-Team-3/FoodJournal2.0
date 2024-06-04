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

    This endpoint receives a JSON string with user information and authenticates the user.
    It expects a POST request with the following JSON payload:
    {
        "username": "string",
        "password": "string"
    }

    Parameters:
    - request (OAuth2PasswordRequestForm): The request object containing user credentials.
    - db (Session): The database session.

    Returns:
    - A dictionary containing the user's access token, token type, user ID, and email upon successful authentication.
    - An HTTPException with status code 401 and detail message "Invalid email or username, try again." if the user does not exist.
    - An HTTPException with status code 401 and detail message "Invalid password, try again." if the provided password is incorrect.
    """
    return await _service.login(request, db)

@router_auth.patch("/update_user")
async def update_user(request: _schemas.UpdateUserBase, accessToken: str, db: Session = Depends(get_db)):
    """
    Updates a user's information in the database.

    Args:
        request (_schemas.UpdateUserBase): The updated user information.
        accessToken (str): The user's access token.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        Coroutine: A coroutine that returns a dictionary with a message indicating the success of the update.
    """
    return await _service.update_user(request, accessToken, db)

@router_auth.get("/get_user")
async def get_user(accessToken: str, db: Session = Depends(get_db)):
    """
    Get the user information from the database based on the provided access token.

    Args:
        accessToken (str): The access token used to authenticate the user.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        Coroutine: A coroutine that returns the user information from the database.
    """
    return await _service.get_user_by_access_token(accessToken, db)

@router_auth.post("/logout")
async def logout(accessToken: str):
    """
    Get the user information from the database based on the provided access token.

    Args:
        accessToken (str): The access token used to authenticate the user.
         
    Returns:
        Coroutine: A coroutine that invalidates the given accessToken.
    """
    return await _service.logout(accessToken)
