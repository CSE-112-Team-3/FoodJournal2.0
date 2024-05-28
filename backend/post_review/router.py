import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
import post_review.service as _service
from post_review.model import PostReviewModel
from service_database import get_db
from sqlalchemy import Inspector, or_, and_, update, delete, insert, select

router_post_review = APIRouter(
    prefix="/api/v1/post_review",
    tags=["post_review"]
)

@router_post_review.post("/create_post_review")
async def create_post_review(
    post_review: _schemas.PostReviewBase, 
    access_token: str,
    db: Session = Depends(get_db)):
    """ 
    Create a new post review in the database. Endpoint receives an access token and
    a JSON string with post review information.
    """
    return await _service.create_post_review(post_review, db, access_token)
  
@router_post_review.get("/get_post_review")
async def get_post_reviews(db: Session = Depends(get_db)):
    """ 
    Get all post reviews from the database.
    Returns a list of tuples where each tuple contains a post review and the user who created it.
    """
    return await _service.get_post_reviews(db)
