import sqlalchemy.orm as _orm
import schemas as _schemas
import datetime as _datetime
import auth.models as _models
from fastapi import HTTPException, status
import email_validator as _email_validator
from uuid import uuid4
from sqlalchemy import or_, and_, update, delete, insert, select
import random
import os
from datetime import timedelta
from auth.utils import verify, create_access_token

async def login(request, db: _orm.Session):
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





