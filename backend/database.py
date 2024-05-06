from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = f'mysql+mysqlconnector://${os.getenv("DB_USERNAME")}:${os.getenv("DB_PASSWORD")}@${os.getenv("DB_HOST")}/${os.getenv("DB_NAME")}'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()