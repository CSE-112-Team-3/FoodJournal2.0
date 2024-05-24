from pydantic import BaseModel
import datetime as dt
from typing import Optional

# ===============================================================
# User schema
# ===============================================================

class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    email: str

class UpdateUserBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[str] = None

# ===============================================================
# Post schema
# ===============================================================
class PostReviewBase(BaseModel):
    food_name: str
    image: str #(optional)
    restaurant_name: str #(optional)
    rating: float
    review: str 
    tags: list[str] #(optional)