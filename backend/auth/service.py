import sqlalchemy.orm as _orm
import schemas as _schemas
import datetime as _datetime
import auth.models as _models
from fastapi import HTTPException, status
import email_validator as _email_validator
from uuid import uuid4
from sqlalchemy import or_
import random
import os
from datetime import timedelta

async def login(request, db):
    user = db.query(_models.UserModel).filter(
        or_(
            _models.UserModel.username == request.username,
            _models.UserModel.email == request.username
        )
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or username, try again."
        )
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





