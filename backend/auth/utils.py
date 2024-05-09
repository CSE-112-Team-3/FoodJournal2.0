from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Annotated, Optional
from sqlalchemy.orm import Session
from database import get_db
from auth import models as _models
import os
from sqlalchemy import or_

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "ef1ebfdd60c45c7f3ed13196999b43d8df60409c3b6ca2ac428b886cbc82beed"
ALGORITHM = "HS256"

# ACCESS_TOKEN_EXPIRE_MINUTES = 2
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def bcrypt(password: str):
    return pwd_context.hash(password)
def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt