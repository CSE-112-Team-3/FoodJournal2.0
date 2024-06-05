from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update, delete, insert, select
import sqlalchemy.orm as _orm
import post_review.model as _model
from auth.service import get_user_by_id
from auth import model as user_model
import schemas
from auth.utils import get_current_user

MAX_POSTS_TO_FECTH = 20

async def get_post_reviews(db: _orm.Session):
    """
    Retrieves a list of posts from the database.

    Args: db (_orm.Session): The database session.

    Returns:
        List[Dict[str, Union[str, int, None]]]: A list of dictionaries representing the posts. Each dictionary contains the following keys:
            - 'food_name' (str): The name of the food.
            - 'image' (str): The URL of the image.
            - 'restaurant_name' (str): The name of the restaurant.
            - 'rating' (int): The rating of the post.
            - 'review' (str): The review of the post.
            - 'tags' (str): The tags associated with the post.
            - 'username' (str): The username of the user who created the post.
            - 'profile_pic' (str or None): The URL of the user's profile picture, or None if no profile picture is available.

    Raises:
        HTTPException: If no posts are found in the database.
        HTTPException: If there is an error retrieving the posts from the database.
    """

    try:
        posts = db.query(_model.PostReviewModel, user_model.UserModel)\
            .join(user_model.UserModel, _model.PostReviewModel.post_id == user_model.UserModel.id)\
            .limit(MAX_POSTS_TO_FECTH)\
            .all()
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")
        
        # Convert the SQLAlchemy query result to a list of dictionaries
        posts = [
            {**post.PostReviewModel.__dict__, 
             "username": post.UserModel.username,
             "profile_pic": getattr(post, 'profile_picture', None) } # Add 'profile_pic' key and assign None if not available otherwise assign the value
                 for post in posts
        ]
        return posts
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Posts could not be retrieved: {e}")

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

async def delete_post_review(id: int, 
                             db: _orm.Session, 
                             access_token: str):
    """
    Deletes a post review from the database.

    :param post_id: Post review ID
    :param db: Database session
    :param access_token: User access token
    :return: Message indicating whether the post was deleted successfully
    """
    user_id = get_current_user(access_token, db)

    try:
        user = db.query(user_model.UserModel).filter(user_model.UserModel.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        post = db.query(_model.PostReviewModel).filter(_model.PostReviewModel.id == id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
                
        db.query(_model.PostReviewModel).filter(_model.PostReviewModel.id == id).delete()
        db.commit()

        return {'message': f"Post {id} deleted"}
    
    except Exception as e:
        db.rollback()
        print(f"Error occurred: {e}")  # Log the error message
        raise HTTPException(status_code=400, detail=f"Post could not be deleted: {str(e)}")

async def get_posts_from_id(post_id: int, db: _orm.Session):
    """
    Retrieve a post review based on the provided post ID.

    :param post_id: Post ID (AKA user id) to retrieve
    :param db: Database session
    :return: Post review information
    """
    try:
        posts = db.query(_model.PostReviewModel).filter(_model.PostReviewModel.post_id == post_id).all()
        if not posts:
            raise HTTPException(status_code=404, detail="Post not found")
        return posts[:MAX_POSTS_TO_FECTH]
    except:
        raise HTTPException(status_code=400, detail="Post could not be retrieved")