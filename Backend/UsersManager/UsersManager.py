from fastapi import HTTPException

from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User

from sqlalchemy.orm import Session
from ..UsersManager.UserDatabaseManager import UserDatabaseManager
from passlib.context import CryptContext
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..database.UserTokenModel import TokenData, Token
import os
load_dotenv(find_dotenv())

CRYPT_SECRET_KEY = os.environ["CRYPT_SECRET_KEY"]
HASH_ALGORITHM = os.environ["HASH_ALGORITHM"]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class UsersManager:
    def __init__(self, db_session: Session):
        self.db_session = db_session
        self.db_manager = UserDatabaseManager(self.db_session)
        self.secret_key = CRYPT_SECRET_KEY
        self.hash_func = HASH_ALGORITHM
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


    def create_user(self, user: User):
        existing_user = self.db_manager.get_user_by_username(user.user)
        if existing_user:
            raise HTTPException(status_code=409, detail="User already exists")
        # roles = [2001]
        # if user.user == "aviv":
        #     roles.append(5150)
        roles = {"role_list": [2001]}
        if user.user == "aviv":
            roles["role_list"].append(5150)
        hashed_pwd = self.get_pwd_hash(user.pwd)
        db_user = UserEntity(user=user.user, email=user.email, hashed_pwd=hashed_pwd, roles=roles)
        self.db_manager.add_user(db_user)
        # By not catching the HTTPException in the create_user method of UsersManager, any exception raised by the
        # add_user method of UserDatabaseManager will propagate up to the caller, including the sign_up function in
        # my endpoints.py file. The HTTPException details can then be returned as part of the
        # API response to the frontend.

    def get_pwd_hash(self, pwd):
        return self.pwd_context.hash(pwd)


    def get_all_users(self):
        return self.db_manager.get_all_users_from_db()


