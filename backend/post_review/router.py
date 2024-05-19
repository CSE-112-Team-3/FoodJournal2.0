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
    user_id: int,
    access_token: str,
    db: Session = Depends(get_db)):
    """ 
    Create a new post review in the database. Endpoint receives
    a JSON string with post review information. To test the endpoint you can create a JSON file
    and run `curl -X POST http://0.0.0.0:6542/create_post_review -H "Content-Type: application/json" -d @<filename>`
    """
    
    post_review_model = PostReviewModel(
        post_id=user_id,  # Assuming post_id corresponds to the user_id
        food_name=post_review.food_name,
        image=post_review.image,
        restaurant_name=post_review.restaurant_name,
        rating=post_review.rating,
        review=post_review.review,
        tags=post_review.tags
    )

    return await _service.create_post_review(post_review_model, db, user_id, access_token)