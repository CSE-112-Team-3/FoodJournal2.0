from . import model
from fastapi import HTTPException, status
from email_validator import validate_email
from sqlalchemy.orm import Session

from .utils.hash import HashPass

def email_exists(db, email):
    """ Check if a given email already exists in the database
    :param db: Database session
    :param email: Email address to check"""
    print(email)
    rslt = db.query(model.UserModel).filter(model.UserModel.email == email).first()
    return True if rslt is not None else False

def get_next_id(db):
    rslt = db.query(model.UserModel).order_by(model.UserModel.id).all()[-1]
    return rslt.id + 1

async def create_user(engine, user):
    """ Create a new user in the database, also check
    if user fields such as email already exist
    :param db: Database session
    :param user: User information to create, should be model.UserModel
    :return: Created user, if an error is raised, return None"""
    with Session(engine) as db:
        # Ensure email is not a duplicate
        if (email_exists(db, user.get('email'))):
            raise HTTPException(status_code=400, detail=f"Email {user.get('email')} already exists")
            return None
        elif (not validate_email(user.get('email'))):
            raise HTTPException(status_code=400, detail=f"Invalid email address")
            return None

        # Add user to database
        try:
            hash = HashPass.get_hash(user.get('password'))
            created_at = user.get('created_at')
            user_obj = model.UserModel( id = get_next_id(db),
                                        first_name=user.get('first_name'), 
                                        last_name=user.get('last_name'),
                                        username=user.get('username'), 
                                        password=hash, 
                                        email=user.get('email'), 
                                        created_at=created_at)
            db.add(user_obj)
            print('added')
            db.commit()
            print('committed')
        except Exception as e:
            print('User not added ', e)
        
        return {"user": user_obj}