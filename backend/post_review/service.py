from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import Inspector, or_, and_, update, delete, insert, select
import sqlalchemy.orm as _orm
from post_review.model import PostReviewModel 
from auth import model as user_model
from sqlalchemy import create_engine, inspect
import schemas

MAX_POSTS_TO_FECTH = 20

async def get_post_reviews(db: _orm.Session):
    """
    Retrieve all posts from the database.

    :param db: Database session
    :return: List of all posts
    """
    try:
        posts = db.query(PostReviewModel).all()
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")
        
        return posts[:MAX_POSTS_TO_FECTH]
    except:
        raise HTTPException(status_code=400, detail=f"Posts could not be retrieved")

async def create_post_review(
        post_review: schemas.PostReviewBase, 
        db: _orm.Session, 
        user_id: int, 
        access_token: str):
    
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    
    try:
        user = db.query(user_model.UserModel).filter(user_model.UserModel.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        post_review_model = PostReviewModel(
            post_id=user_id,  # Assuming post_id corresponds to the user_id
            food_name=post_review.food_name,
            image=post_review.image,
            restaurant_name=post_review.restaurant_name,
            rating=post_review.rating,
            review=post_review.review,
            tags=post_review.tags
        )
        db.add(post_review_model)
        db.commit()

        return {'message': f"Post {post_review_model.id} created"}
    
    except Exception as e:
        db.rollback()
        print(f"Error occurred: {e}")  # Log the error message
        raise HTTPException(status_code=400, detail=f"Post could not be added: {str(e)}")
