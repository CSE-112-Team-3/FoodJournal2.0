import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
import schemas as _schemas
import sqlalchemy.orm as _orm
from sqlalchemy.orm.session import Session
import post_review.service as _service
from post_review.model import PostReviewModel
from service_database import get_db

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

@router_post_review.post("/delete_post_review")
async def delete_post_review(
    id: int,
    access_token: str,
    db: Session = Depends(get_db)):
    """ 
    Delete a post review from the database. Endpoint receives an access token and
    a post id. The ID recevied in the post request is the ID of the post to remove.
    """
    return await _service.delete_post_review(id, db, access_token)