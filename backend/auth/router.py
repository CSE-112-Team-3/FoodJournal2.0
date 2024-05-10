from fastapi import APIRouter, Depends, HTTPException, status

import schemas as _schemas
import sqlalchemy.orm as _orm
from auth import models as _model
from sqlalchemy.orm.session import Session
from service_database import get_db
import auth.service as _service
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

router_auth = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)

@router_auth.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return await _service.login(request, db)





