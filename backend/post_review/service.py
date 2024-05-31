from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update, delete, insert, select
import sqlalchemy.orm as _orm
import post_review.model as _model
from auth import model as user_model
import schemas
from auth.utils import get_current_user

MAX_POSTS_TO_FECTH = 20

async def get_post_reviews(db: _orm.Session):
    """
    Retrieve all posts from the database.

    :param db: Database session
    :return: List of all posts
    """
    try:
        posts = db.query(_model.PostReviewModel).all()
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")
        
        return posts[:MAX_POSTS_TO_FECTH]
    except:
        raise HTTPException(status_code=400, detail=f"Posts could not be retrieved")

async def create_post_review(
        post_review: schemas.PostReviewBase, 
        db: _orm.Session, 
        access_token: str
        ):
    
    """
    Creates a new post review in the database.

    :param post_review: Post review information
    :param db: Database session
    :param access_token: User access token
    :return: Message indicating whether the post was created successfully
    """
    user_id = get_current_user(access_token, db)

    try:
        user = db.query(user_model.UserModel).filter(user_model.UserModel.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        post_review_model = _model.PostReviewModel(
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
    
async def update_post_review(
        post_review: schemas.PostReviewBase, 
        db: _orm.Session, 
        access_token: str,
        id: int
        ):

    user_id = get_current_user(access_token, db)

    try:
        
        user = db.query(user_model.UserModel).filter(user_model.UserModel.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        db.query(_model.PostReviewModel).filter(_model.PostReviewModel.id == id).update({
            'food_name': post_review.food_name,
            'image': post_review.image,
            'restaurant_name': post_review.restaurant_name,
            'rating': post_review.rating,
            'review': post_review.review,
            'tags': post_review.tags})
        
        db.commit()

        return {'message': f"Post {_model.PostReviewModel.id} updated"}
    
    except Exception as e:
        db.rollback()
        print(f"Error occurred: {e}")  # Log the error message
        raise HTTPException(status_code=400, detail=f"Post could not be updated: {str(e)}")