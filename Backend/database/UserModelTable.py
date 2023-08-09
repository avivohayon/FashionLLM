from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from Backend.common.UserDataBaseProvider import Base


class UserEntity(Base):
    __tablename__ = 'UsersTable'

    user = Column(String(10), primary_key=True)
    email = Column(String(255))
    hashed_pwd = Column(String(255))
    api_count = Column(Integer, default=20)
    disabled = Column(Boolean, default=None, nullable=True)

    # def __init__(self, user_name, pwd):
    #     self.user_name = user_name
    #     self.hashed_password = pwd
    #
    # def __repr__(self):
    #     return f"user name: ({self.user_name}), pwd: ({self.password}), api_count: ({self.api_count})"

#