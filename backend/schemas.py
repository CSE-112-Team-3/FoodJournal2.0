from pydantic import BaseModel
import datetime as dt

# ===============================================================
# User schemas
# ===============================================================

class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    email: str
