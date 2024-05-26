from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class PostReviewModel(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, nullable=False)
    food_name = Column(String, nullable=False)
    image = Column(String, nullable=True)
    restaurant_name = Column(String, nullable=True)
    rating = Column(Float, nullable=False)
    review = Column(String, nullable=False)
    tags = Column(String, nullable=True)
