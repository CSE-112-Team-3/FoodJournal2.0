from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from post_review.model import PostReviewModel
from post_review.service import get_posts, delete_post_review
from auth.utils import create_access_token
from backend import database
import os
from dotenv import load_dotenv

class testPostModel():

    def setup_class(self):
        # Load environment variables (if using .env file)
        load_dotenv()

        DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        Base = declarative_base()

        Base.metadata.create_all(engine)
        self.session = SessionLocal()
        self.valid_post1 = PostReviewModel(
            id=1,
            food_name='burrito',
            restaurant_name='taco stand',
            rating=5,
            review='super good tortilla',
            tags='mexican food'
        )
        self.valid_post2 = PostReviewModel(
            id=2,
            food_name='pizza',
            restaurant_name='Regents Pizza',
            rating=2,
            review='funky cheese',
            tags='pizza'
        )

    def test_get_post(self):
        self.session.add(self.valid_post1)
        self.session.commit()
        query_result = get_posts(self.session)
        query_result = query_result[0]

        assert query_result.food_name == 'burrito'
        assert query_result.restaurant_name == 'taco stand'
        assert query_result.rating == 5
        assert query_result.review == 'super good tortilla'
        assert query_result.tags == 'mexican food'

    def test_delete_post(self):
        # Access token creds should be replaced with actual user creds
        token = create_access_token(
                            data={
                                "email": 'test1@gmail.com',
                                "user_id": str(1)
                            },
                        )

        before = len(self.session.query(PostReviewModel).all())
        delete_post_review(1, self.session, token)
        posts = self.session.query(PostReviewModel).all()
        assert len(posts) == before - 1

    def teardown_class(self):
        self.session.rollback()
        self.session.close()