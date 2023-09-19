from fastapi import HTTPException
from sqlalchemy import update

from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, status, APIRouter, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from Backend.database.UserTokenModel import TokenData, Token, UserLogin
from Backend.common.UserDataBaseProvider import SessionLocal, engine
from Backend.UsersManager.UsersManager import UsersManager
from pydantic import BaseModel
from fastapi_jwt_auth import AuthJWT
import os
"""
End points for the sign-up and login users options with jwt security
"""

load_dotenv(find_dotenv())

CRYPT_SECRET_KEY = os.environ["CRYPT_SECRET_KEY"]
HASH_ALGORITHM = os.environ["HASH_ALGORITHM"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

ACCESS_TOKEN_EXPIRES_MINUTES = 30
REFRESH_TOKEN_EXPIRES_HOURS = 3

router = APIRouter(
    prefix='/auth',
    tags=['auth'],

)

ROLE_LIST = {
    "Admin": 5150,
    "User": 2001
}

class Settings(BaseModel):
    authjwt_secret_key: str = CRYPT_SECRET_KEY
    authjwt_token_location: set = {'cookies', 'headers'}
    authjwt_cookie_secure: bool = False

    authjwt_access_cookie_key: str = 'access_token'
    authjwt_refresh_cookie_key: str = 'refresh_token'
    authjwt_cookie_csrf_protect: bool = True

@AuthJWT.load_config
def get_config():
    return Settings()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db_manager(db : Session = Depends(get_db)):
    user_manager = UsersManager(db)
    try:
        yield user_manager
    finally:
        print("find a way to close user_manger")


def authenticated_user( username: str, password: str, db: Session) -> bool | UserEntity:
    user_db = db.query(UserEntity).filter(UserEntity.user == username).first()
    if not user_db:
        return False
    if not pwd_context.verify(password, user_db.hashed_pwd):
        return False
    return user_db

#
# def create_access_token(username:str, expires_delta: timedelta or None = None) -> str:
#     to_encode = {"sub": username}
#     if expires_delta:
#         expires = datetime.utcnow() + expires_delta
#     else:
#         expires = datetime.utcnow() + timedelta(minutes=15)
#
#     to_encode.update({'exp': expires})
#     encoded_jwt = jwt.encode(to_encode, CRYPT_SECRET_KEY, HASH_ALGORITHM)
#     return encoded_jwt


# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                                          detail="Could not validate credentials",
#                                          headers={"WWW-Authenticate": "Bearer"})
#     try:
#         payload = jwt.decode(token, CRYPT_SECRET_KEY, [HASH_ALGORITHM])
#         username: str = payload.get('sub')  # the key to encode inside the jwt token
#         if username is None:
#             raise credential_exception
#
#         token_data = TokenData(username=username)
#         return token_data
#
#     except JWTError:
#         raise credential_exception

async def require_user(db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
        username = Authorize.get_jwt_subject()
        user_db = db.query(UserEntity).filter(UserEntity.user == username).first()

        if not user_db:
            raise HTTPException(detail='User no longer exist')

    except Exception as e:
        error = e.__class__.__name__
        print(error)
        if error == 'MissingTokenError':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='You are not logged in')
        if error == 'UserNotFound':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='User no longer exist')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='Token is invalid or has expired')
    return user_db

# @router.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
#                                  db: Session = Depends(get_db)):
#
#     user = authenticated_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                             detail="Incorrect username or password",
#                             headers={"WWW-Authenticate": "Bearer"})
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
#     access_token = create_access_token(user.user, expires_delta=access_token_expires)
#     return {"access_token": access_token, "token_type": "bearer"}

#
# @router.get("/avivohayon/fashionai/user", status_code=status.HTTP_200_OK)
# async def get_user( current_user: TokenData = Depends(get_current_user)) :
#     if current_user is None:
#         raise HTTPException(status_code=401, detail="Authentication Faild")
#     return {"User": current_user.username}



# We need to have an independent database session/connection (SessionLocal) per request,
# use the same session through all the request and then close it after the request is finished.
# so we will pass the db: Session with the get_db func as dependency
@router.post("/avivohayon/fashionai/sign-up")
async def sign_up(user: User, db: Session = Depends(get_db)):
    if not (user.user and user.email and user.pwd):
        raise HTTPException(status_code=400, detail="User, Email, and Password are required")

    user_manager = UsersManager(db)
    try:

        user_manager.create_user(user)
        return {"success": f"New user {user.user} created"}

    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/login")
def login(user: UserLogin, response: Response, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    user = authenticated_user(user.username, user.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    access_token_expires = timedelta(seconds=30)

    refresh_token_expires = timedelta(hours=REFRESH_TOKEN_EXPIRES_HOURS)
    # Store the jwt and refresh token in the JWT Authorize api
    access_token = Authorize.create_access_token(subject=user.user, expires_time=access_token_expires)
    refresh_token = Authorize.create_refresh_token(subject=user.user, expires_time=refresh_token_expires)


    # Store refresh and access tokens in cookie as httponly against CSRF attacks
    response.set_cookie('access_token', access_token, max_age=ACCESS_TOKEN_EXPIRES_MINUTES * 60, httponly=True)
    response.set_cookie('refresh_token', refresh_token, max_age=REFRESH_TOKEN_EXPIRES_HOURS * 3600 , httponly=True)

    # response.set_cookie('access_token', access_token, max_age=10, httponly=True)
    # response.set_cookie('refresh_token', refresh_token, max_age=15 , httponly=True)

    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_MINUTES * 60,
                        ACCESS_TOKEN_EXPIRES_MINUTES * 60, '/', None, False, False, 'lax')

    # Store the refresh token in the users DB
    user.refresh_token = refresh_token
    print("len")
    print(len(refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, 'roles': user.roles['role_list']}


#TODO
# need to store the refhresh tokens in db, need to think what the key for it should be (maybe the user+hashpwd)
# and in the client will store the refresh token in a local storage
@router.get("/refresh")
async def refresh_jwt(response: Response, Authorize: AuthJWT = Depends()):

    """
    input: the expired jwt  with the refresh token
    output: new jwt and the given refresh token for latter usage
    :return:
    """
    try:

        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid fastjwt REFRESH TOKEN")

    current_user = Authorize.get_jwt_subject()
    if not current_user:
        raise  HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The user belonging to this token no logger exist'")
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    access_token_expires = timedelta(seconds=30)

    new_access_token = Authorize.create_access_token(subject=current_user, expires_time=access_token_expires)

    # response.set_cookie('access_token', new_access_token, max_age=ACCESS_TOKEN_EXPIRES_MINUTES * 60 , httponly=True)

    response.set_cookie('access_token', new_access_token, max_age=10 , httponly=True)
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_MINUTES * 60,
                        ACCESS_TOKEN_EXPIRES_MINUTES * 60, '/', None, False, False, 'lax')

    print("refreshed jwt backend")
    return {"access_token": new_access_token}

@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), user_db: UserEntity = Depends(require_user)):
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)

    return {'status': 'success', "log_out_user": user_db.user}


@router.get("/protected/")
async def get_logged_in_user(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token fastjwt")

    current_user = Authorize.get_jwt_subject() # get the data from the cur log in user (based on the givien jwt token cookie)
    return {"current_user": current_user}

@router.get("/users")
async def get_all_users(Authorize: AuthJWT = Depends(), db_manager: UsersManager = Depends(get_db_manager)):
    try:
            Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token GET_ALL_UER")

    current_user = Authorize.get_jwt_subject()  # get the data from the cur log in user (based on the givien jwt token cookie)
    all_users = db_manager.get_all_users()
    return {"current_user": current_user, "all_users": all_users}