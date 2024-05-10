from . import model
from fastapi import HTTPException, status
from email_validator import validate_email

def email_exists(db, email):
    """ Check if a given email already exists in the database
    :param db: Database session
    :param email: Email address to check"""
    
    rslt = db.query(model.UserModel).filter(model.UserModel.email == email).first()
    return True if rslt is not None else False

async def create_user(db, user):
    """ Create a new user in the database, also check
    if user fields such as email already exist
    :param db: Database session
    :param user: User information to create, should be model.UserModel
    :return: Created user, if an error is raised, return None"""

    # Ensure email is not a duplicate
    if (email_exists(db, user.email)):
        raise HTTPException(status_code=400, detail=f"Email {user.email} already exists")
        return None
    elif (not validate_email(user.email)):
        raise HTTPException(status_code=400, detail=f"Invalid email address")
        return None
    