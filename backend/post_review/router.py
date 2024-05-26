import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import post_review.service as _service
from post_review.model import PostReviewModel
from service_database import get_db

router_post_review = APIRouter(
    prefix="/api/v1/post_review",
    tags=["post_review"]
)

@router_post_review.get("/get_post_review")
async def get_post_reviews(db: Session = Depends(get_db)):
    """ 
    Get all post reviews from the database.
    Returns a list of tuples where each tuple contains a post review and the user who created it.
    """
    return await _service.get_post_reviews(db)