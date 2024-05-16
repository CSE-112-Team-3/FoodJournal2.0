from pydantic import BaseModel
import datetime as dt

# ===============================================================
# User schema
# ===============================================================

class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    email: str

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