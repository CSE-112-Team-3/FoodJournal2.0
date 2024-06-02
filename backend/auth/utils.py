from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Annotated, Optional
from sqlalchemy.orm import Session
import os
from sqlalchemy import or_
from service_database import get_db

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
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), 
                     db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("email")
        if username is None:
            raise credentials_exception
        return payload.get("user_id")
    except Exception as e:
        raise credentials_exception
    
def invalidate(token: str):
    # Decode the token to get the payload
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    # Set the token to expire in the past
    payload['exp'] = datetime.now() - timedelta(seconds=1)

    # Re-encode the token with the updated payload
    invalidated_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return invalidated_token
