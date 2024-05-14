from fastapi import APIRouter
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from backend import database
from auth.models import UserModel


class testUserModel():

    def setup_class(self):
        database.Base.metadata.create_all(database.engine)
        self.session = database.SessionLocal()
        self.valid_user1 = UserModel(
            first_name='Thomas',
            last_name='Powell',
            username='tpowell',
            email='tpowell@foodjournal.com'
        )
        self.valid_user2 = UserModel(
            first_name='Bob',
            last_name='Jean',
            username='bjean',
            email='bjean@gmail.com'
        )

    def test_user_valid(self):
        self.session.add(self.valid_user1)
        self.session.commit()
        query_result = self.session.query(UserModel).filter_by(last_name='Powell').first()

        assert query_result.first_name == 'Thomas'
        assert query_result.last_name == 'Powell'
        assert query_result.email == 'tpowell@foodjournal.com'
    
    def test_add_delete_same_user(self):
        self.session.add(self.valid_user2)
        self.session.commit()

        query_result = self.session.query(UserModel).filter_by(last_name='Jean').first()

        self.session.delete(query_result)
        self.session.commit()

        query_result = self.session.query(UserModel).filter_by(last_name='Jean').first()

        assert query_result == None

    def teardown_class(self):
        self.session.rollback()
        self.session.close()