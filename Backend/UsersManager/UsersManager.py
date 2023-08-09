from fastapi import HTTPException

from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from ..UsersManager.UserDatabaseManager import UserDatabaseManager


class UsersManager:
    def __init__(self, db_session: Session):
        self.db_session = db_session
        self.db_manager = UserDatabaseManager(self.db_session)

    def create_user(self, user: User):
        existing_user = self.db_manager.get_user_by_username(user.user)
        if existing_user:
            raise HTTPException(status_code=409, detail="User already exists")

        self.db_manager.add_user(user)
        # By not catching the HTTPException in the create_user method of UsersManager, any exception raised by the
        # add_user method of UserDatabaseManager will propagate up to the caller, including the sign_up function in
        # my endpoints.py file. The HTTPException details can then be returned as part of the
        # API response to the frontend.