from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update, delete, insert, select
import sqlalchemy.orm as _orm
import post_review.model as _model

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
            return None
        
        return posts[:MAX_POSTS_TO_FECTH]
    except:
        raise HTTPException(status_code=400, detail=f"Posts could not be retrieved")
        return None