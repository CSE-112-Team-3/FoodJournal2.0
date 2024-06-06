from . import model
from fastapi import Depends, HTTPException, status
from email_validator import validate_email
from sqlalchemy.orm import Session
from auth.utils import bcrypt
from sqlalchemy import DateTime
import sqlalchemy.orm as _orm
import schemas as _schemas
import datetime as _datetime
import auth.model as _models
import auth.utils as util
from uuid import uuid4
from sqlalchemy import or_, and_, update, delete, insert, select
import random
import os
from datetime import timedelta
from auth.utils import verify, create_access_token, get_current_user

def email_exists(db: _orm.Session, email: str):
    """ Check if a given email already exists in the database
    :param db: Database session
    :param email: Email address to check"""
    rslt = db.query(model.UserModel).filter(model.UserModel.email == email).first()
    return True if rslt is not None else False

def is_login(db: _orm.Session, email: str):
    """
    Check if a given email is logged in by querying the database.
    
    :param db: Database session
    :param email: Email address to check
    :return: True if the email is logged in, False otherwise
    """
    rslt = db.query(model.UserModel).filter(model.UserModel.email == email).first()
    return True if rslt is not None else False

def get_next_id(db: _orm.Session):
    """ 
    Get the next usable ID from the database. Check
    the ID everytime instead of using local count to ensure that
    if the server restarts the count isn't reset.

    :paam db: Database session
    :returns: Next usable ID
    """
    rslt = db.query(model.UserModel).order_by(model.UserModel.id).all()[-1]
    return rslt.id + 1

async def create_user(user, db: _orm.Session):
    """ 
    Create a new user in the database, also check
    if user fields such as email already exist

    :param db: Database engine, will be converted to session
    :param user: User information to create, should be a dict
    :return: Created user, if an error is raised, return None"""

    if (email_exists(db, user.email)):
        raise HTTPException(status_code=400, detail=f"Email {user.email} already exists")
    elif (not validate_email(user.email)):
        raise HTTPException(status_code=400, detail=f"Invalid email address")
    elif (user_exists(user.username, db)):
        print(user.username)
        raise HTTPException(status_code=400, detail=f"User {user.username} already exists")

    try:
        hash = bcrypt(user.password)
        user_obj = model.UserModel( first_name=user.first_name, 
                                    last_name=user.last_name,
                                    username=user.username, 
                                    password=hash, 
                                    email=user.email,
                                    profile_picture=user.profile_picture )
        db.add(user_obj)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"User could not be added: {e}")

    return {"user": user}

async def login(request, db: _orm.Session):
    """
    Authenticate a user based on the provided request and database session.

    :param request: Request object containing user credentials
    :param db: Database session
    :return: User access token and information upon successful authentication
    """
    
    # grabs information in regards to user per request
    user = db.query(_models.UserModel).filter(
        or_(
            _models.UserModel.username == request.username,
            _models.UserModel.email == request.username
        )
    ).first()
    # return unauth if no user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or username, try again."
        )
    # case for inputting a wrong password
    if not verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password, try again."
        )
    access_token = create_access_token(
        data={
            "email": user.email,
            "user_id": str(user.id)
        },
        expires_delta=timedelta(hours=24)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
    }

async def get_user_by_id(user_id: int, db: _orm.Session):
    """
    Retrieve a user based on the provided user ID.

    :param user_id: User ID to retrieve
    :param db: Database session
    :return: User information
    """
    try:
        user = db.query(_models.UserModel).filter(_models.UserModel.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user.username
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User could not be retrieved"
        )

async def update_user(request: _schemas.UpdateUserBase, accessToken: str, db: _orm.Session):
    """
    Update a user's information based on the provided request and access token.

    :param request: An instance of the UpdateUserBase schema containing the updated user information.
    :param accessToken: The access token of the user making the request.
    :param db: The database session.
    :return: A dictionary with a message indicating that the user was updated.
    """
    try:
        user_id = get_current_user(accessToken, db)
        update_data = request.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=400, detail=f"No fields to update")
        if update_data.get("email"):
            if (email_exists(db, update_data.get("email"))):
                raise HTTPException(status_code=400, detail=f'Email {update_data.get("email")} already exists')
            elif (not validate_email(update_data.get("email"))):
                raise HTTPException(status_code=400, detail=f"Invalid email address")
        if update_data.get("username"):
            username = update_data.get("username")
            if (user_exists(username, db)):
                raise HTTPException(status_code=400, detail=f'User {username} already exists')
        if update_data.get("password"):
            update_data["password"] = bcrypt(update_data.get("password"))
        stmt = (
            update(_models.UserModel).
            where(_models.UserModel.id == user_id).
            values(**update_data)
        )
        result = db.execute(stmt)
        if result.rowcount == 0:
            raise HTTPException (
                status_code = status.HTTP_404_NOT_FOUND,
                detail = "User not found"
            )
        db.commit()
        return {"message":"User was updated"}
    except HTTPException as http_exception:
        raise http_exception  # Re-raise HTTPException with custom message and status code

    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred", success=False)

def user_exists(username: str, db: _orm.Session):
    """
    Check if a user with the given username exists in the database.

    Args:
        username (str): The username to check.
        db (_orm.Session): The database session.

    Returns:
        bool: True if the user exists, False otherwise.
    """
    result = db.query(_models.UserModel).filter(_models.UserModel.username == username).first()
    return True if result is not None else False

async def get_user_by_access_token(access_token: str, db: _orm.Session):
    """
    Retrieves a user from the database based on their access token.

    :param access_token: The access token of the user.
    :param db: The database session.
    :return: The user object.
    """
    user_id = get_current_user(access_token, db)
    user = db.query(_models.UserModel).filter(_models.UserModel.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    del user.password
    del user.created_at
    
    return user

async def logout(token: str):
    """
    Invalidate the given access token.

    :param access_token: The access token of the user.
    """
    return util.invalidate(token)
