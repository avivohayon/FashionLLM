from sqlalchemy.orm import declarative_base
from sqlalchemy.orm.session import Session
from sqlalchemy.pool import QueuePool
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv, find_dotenv

import os

load_dotenv(find_dotenv())

DATABASE_URL = os.environ["DATABASE_URL"]
# Using a connection pooling mechanism for up to 5 db connection for better scaling

engine = create_engine(
                DATABASE_URL,
                pool_size=5,  # Adjust this based on your needs
                poolclass=QueuePool
            )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Base = declarative_base()

# class UserTable(Base):
#     __tablename__ = 'UserTable'
#
#     user_name = Column(String(10), primary_key=True)
#     password = Column(String(255))
#     api_count = Column(Integer, default=20)
#
#     def __init__(self, user_name, pwd):
#         self.user_name = user_name
#         self.password = pwd
#
#     def __repr__(self):
#         return f"user name: ({self.user_name}), pwd: ({self.password}), api_count: ({self.api_count})"
#
#
# class UsersDataBaseProvider:
#     _instance = None
#
#     def __new__(cls):
#         if cls._instance is None:
#             cls._instance = super().__new__(cls)
#             cls._instance.engine = create_engine(
#                 DATABASE_URL,
#                 pool_size=5,  # Adjust this based on your needs
#                 poolclass=QueuePool
#             )
#             cls._instance.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls._instance.engine)
#         return cls._instance
#
#     def get_session(self) -> Session:
#         return self.SessionLocal()
#
# # Add more methods to interact with the database
# def add_user(key, password):
#     session = db_provider.get_session()
#     new_user = UserTable(user_name=key, password=password)
#     session.add(new_user)
#     session.commit()
#
#
# # Delete a user
# def delete_user(key):
#     session = db_provider.get_session()
#     user = session.query(UserTable).filter_by(key=key).first()
#     if user:
#         session.delete(user)
#         session.commit()
#
#
# # Update user's API count
# def update_api_count(key, new_count):
#     session = db_provider.get_session()
#     user = session.query(UserTable).filter_by(key=key).first()
#     if user:
#         user.api_count = new_count
#         session.commit()
#

# if __name__ == "__main__":
    # db_provider = UsersDataBaseProvider()
    # add_user("user123", "pass456")
    # delete_user("user123")
    # update_api_count("user456", 30)

    # Add a new user
