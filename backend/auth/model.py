import datetime as _datetime
import datetime
from sqlalchemy import Column, Integer, String, DateTime
import datetime as _datetime
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "fd_users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

'''
class VisitorModel(Base):
    __tablename__ = "fd_visitors"

    email: Column(String, nullable=False)
    password: Column(String, nullable=False)
'''