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

# ===============================================================
# Post schema
# ===============================================================
class PostReviewBase(BaseModel):
    food_name: str
    image: Optional[str] 
    restaurant_name: Optional[str]
    rating: float
    review: str 
    tags: Optional[str]