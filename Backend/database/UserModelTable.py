from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY
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
    refresh_token = Column(String(312), default=None, nullable=True)
    role = Column(ARRAY(Integer), default=[2001])

