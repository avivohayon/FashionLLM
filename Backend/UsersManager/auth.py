from fastapi import HTTPException

from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, status, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from Backend.database.UserTokenModel import TokenData, Token
from Backend.common.UserDataBaseProvider import SessionLocal, engine
from Backend.UsersManager.UsersManager import UsersManager
from typing import Annotated
import os


load_dotenv(find_dotenv())

CRYPT_SECRET_KEY = os.environ["CRYPT_SECRET_KEY"]
HASH_ALGORITHM = os.environ["HASH_ALGORITHM"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

ACCESS_TOKEN_EXPIRES_MINUTES = 30

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def authenticated_user( username: str, password: str, db: Session) -> bool | UserEntity:
    user_db = db.query(UserEntity).filter(UserEntity.user == username).first()
    if not user_db:
        return False
    if not pwd_context.verify(password, user_db.hashed_pwd):
        return False
    return user_db


def create_access_token(username:str, expires_delta: timedelta or None = None) -> str:
    to_encode = {"sub": username}
    if expires_delta:
        expires = datetime.utcnow() + expires_delta
    else:
        expires = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({'exp': expires})
    encoded_jwt = jwt.encode(to_encode, CRYPT_SECRET_KEY, HASH_ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials",
                                         headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, CRYPT_SECRET_KEY, [HASH_ALGORITHM])
        username: str = payload.get('sub')  # the key to encode inside the jwt token
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)
        return token_data

    except JWTError:
        raise credential_exception


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                 db: Session = Depends(get_db)):

    user = authenticated_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    access_token = create_access_token(user.user, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/avivohayon/fashionai/user", status_code=status.HTTP_200_OK)
async def get_user( current_user: TokenData = Depends(get_current_user)) :
    if current_user is None:
        raise HTTPException(status_code=401, detail="Authentication Faild")
    return {"User": current_user.username}


# We need to have an independent database session/connection (SessionLocal) per request,
# use the same session through all the request and then close it after the request is finished.
# so we will pass the db: Session with the get_db func as dependency
@router.post("/avivohayon/fashionai/sign-up/")
async def sign_up(user: User, db: Session = Depends(get_db)):
    if not (user.user and user.email and user.pwd):
        raise HTTPException(status_code=400, detail="User, Email, and Password are required")

    user_manager = UsersManager(db)
    try:

        user_manager.create_user(user)
        return {"success": f"New user {user.user} created"}

    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

