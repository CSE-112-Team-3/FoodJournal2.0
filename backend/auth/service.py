from . import model
from fastapi import HTTPException, status
from email_validator import validate_email
from sqlalchemy.orm import Session
from auth.utils import bcrypt
from sqlalchemy import DateTime
import sqlalchemy.orm as _orm
import schemas as _schemas
import datetime as _datetime
import auth.model as _models
from uuid import uuid4
from sqlalchemy import or_, and_, update, delete, insert, select
import random
import os
from datetime import timedelta
from auth.utils import verify, create_access_token

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
    # Ensure email is not a duplicate
    if (email_exists(db, user.email)):
        raise HTTPException(status_code=400, detail=f"Email {user.email} already exists")
    elif (not validate_email(user.email)):
        raise HTTPException(status_code=400, detail=f"Invalid email address")

    # Add user to database
    try:
        hash = bcrypt(user.password)
        user_obj = model.UserModel( first_name=user.first_name, 
                                    last_name=user.last_name,
                                    username=user.username, 
                                    password=hash, 
                                    email=user.email)
        db.add(user_obj)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"User could not be added")
    
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

async def get_user_by_username(username: str, db: _orm.Session):
    try:
        user = db.query(_models.UserModel).filter(_models.UserModel.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user.id
    except:
        raise HTTPException(status_code=400, detail=f"User could not be retrieved")