import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import auth.service as _service
from post_review.model import PostReviewModel
from service_database import get_db

router_post_review = APIRouter(
    prefix="/api/v1/post_review",
    tags=["post_review"]
)