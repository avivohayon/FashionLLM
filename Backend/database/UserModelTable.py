from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY, JSON
from sqlalchemy.orm import relationship

from Backend.common.UserDataBaseProvider import Base

"""
Define the data structure to insert into the mysql users db
"""
class UserEntity(Base):
    __tablename__ = 'UsersTable'

    user = Column(String(10), primary_key=True)
    email = Column(String(255))
    hashed_pwd = Column(String(255))
    api_count = Column(Integer, default=20)
    disabled = Column(Boolean, default=None, nullable=True)
    refresh_token = Column(String(320), default=None, nullable=True)
    roles = Column(JSON, default=[2001])

"""
Define the data structure to insert the user's searched fashion data
"""
class UserFashion(Base):
    __tablename__ = 'UsersFashionTable'

    id = Column(Integer, primary_key=True, nullable=False)
    user = Column(String(10), ForeignKey('UsersTable.user', ondelete='CASCADE'), nullable=False)
    collections = Column(String(100))
    target_name = Column(String(100))

