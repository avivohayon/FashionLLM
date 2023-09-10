from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from pydantic import BaseModel
from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import os

load_dotenv(find_dotenv())

CRYPT_SECRET_KEY = os.environ["CRYPT_SECRET_KEY"]
HASH_ALGORITHM = os.environ["HASH_ALGORITHM"]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class Token(BaseModel):
    access_token: str
    token_type : str


class TokenData(BaseModel):
    username: str or None = None


class UserDatabaseManager:
    """
    this class responsible for all the My Sql DB access for the Users
    Mostly use in UserManger class in a composition approach
    """
    def __init__(self, db_session: Session):
        self.db_session = db_session
        self.secret_key = CRYPT_SECRET_KEY
        self.hash_func = HASH_ALGORITHM
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


    def verify_password(self, plain_pwd, hashed_pwd):
        return self.pwd_context.verify(plain_pwd, hashed_pwd)

    def get_pwd_hash(self, pwd):
        return self.pwd_context.hash(pwd)

    def get_user_by_username(self, username: str) -> UserEntity | None:
        return self.db_session.query(UserEntity).filter(UserEntity.user == username).first()

    def authenticated_user(self, user: User) -> bool | UserEntity:
        user_db = self.get_user_by_username(user.user)
        if not user:
            return False
        if not self.verify_password(user.pwd, user_db.hashed_pwd):
            return False
        return user_db


    def add_user(self, user: User):
        """
        add valid user input to the db
        :param user: Pydantic class User
        :raises HTTPException: If there's an error during database operation
        """
        try:
            hashed_pwd = self.get_pwd_hash(user.pwd)
            db_user = UserEntity(user=user.user, email=user.email, hashed_pwd=hashed_pwd)
            self.db_session.add(db_user)
            self.db_session.commit()
        except SQLAlchemyError as e:
            self.db_session.rollback()  # Rollback changes if there's an error
            raise HTTPException(status_code=500, detail="Internal MySQL server error")

    def create_access_token(self, data: dict, expires_delta: timedelta or None = None ) -> str:
        to_encode = data.copy()
        if expires_delta:
            expires = datetime.utcnow() + expires_delta
        else:
            expires = datetime.utcnow() + timedelta(minutes=15)

        to_encode.update({'exp': expires})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, self.hash_func)
        return encoded_jwt

    async def get_current_user(self, token: str = Depends(oauth2_scheme)):
        credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZEDת,
                                             detail="Could not validate credentials",
                                             headers={"WWW-Authenticate": "Bearer"})
        try:
            payload = jwt.decode(token, self.secret_key, [self.hash_func])
            username: str = payload.get('sub') # the key to encode inside the jwt token
            if username is None:
                raise credential_exception

            token_data = TokenData(username=username)

        except JWTError:
            raise credential_exception

        user = self.get_user_by_username(username= token_data.username)
        if user is None:
            raise credential_exception

        return user

    async def get_current_active_user(self, cur_user: UserEntity = Depends(get_current_user)):
        if cur_user.disabled:
            raise HTTPException(status_code=400, detail="Inactive user")

        return cur_user

