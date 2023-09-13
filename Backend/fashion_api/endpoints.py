from fastapi import APIRouter, Depends, HTTPException, status
from Backend.Factory.FashionServiceFactory import FashionServiceFactory
from Backend.common.CacheProvider import CacheProvider
from Backend.fashion_api.models import CelebFashion, AiResult
from Backend.Fashion_Ai.fashion_ai import FashionAi
from Backend.common.UserDataBaseProvider import SessionLocal, engine
from Backend.database.UserModelTable import UserEntity, Base
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from Backend.UsersManager.UsersManager import UsersManager
from time import sleep, perf_counter
from Backend.UsersManager.auth import Settings, get_config
from fastapi_jwt_auth import AuthJWT

cache_provider = CacheProvider()
router = APIRouter()


@AuthJWT.load_config
def get_config():
    return Settings()


Base.metadata.create_all(bind=engine)



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_cele_fashion_llm():
    fashion_llm = FashionAi()
    try:
        yield fashion_llm
    finally:
        print("find a way to cloe the llm model")

def get_db_manager(db : Session = Depends(get_db)):
    user_manager = UsersManager(db)
    try:
        yield user_manager
    finally:
        print("find a way to close user_manger")



@router.on_event("startup")
def startup_event():
    cache_provider.create_redis_client()


@router.on_event("startup")
def start_up_populate_db():
    db = SessionLocal()
    num_users = db.query(UserEntity).count()
    if num_users == 0:
        print("if nums == o")
        users = [
            {"user": "aviv", "email": "aviv@gmail.com", "hashed_pwd": "123", "refresh_token": "sss"},
            {"user":"ziv", "email": "ziv@gmail.com", "hashed_pwd":"456"},
            {"user":"itay",  "email": "itay@gmail.com","hashed_pwd":"789"},

        ]
        for user in users:
            x = user["user"]
            print(f"cur user name to upload to db is: {x}")

            db.add(UserEntity(**user))
        db.commit()
    else:
        print(f"{num_users} users already in DB")


@router.on_event("shutdown")
def shutdown_event():
    SessionLocal().close()
    cache_provider.close_redis_client()




#TODO send a jwt token to each of our main application api functions
@router.get("/avivohayon/fashionai/data/{service}")
async def get_celeb_fashion(service:str, celebrity_name: str, fashion_llm: FashionAi = Depends(get_cele_fashion_llm)):
    """
    main up backend funcunality exposed url for get request via the forntend,
    :param service: the chosen fashion website service
    :param celebrity_name: the name of the celebrity from the user
    :param fashion_llm: no need to send as a query parameter as its inited when the server run
    :return: {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    """
    print("Get_Celeb_Fashion start ")
    if celebrity_name == "":
        return
    print('start post test')
    if "[object HTMLInputElement]" == celebrity_name:
        return "[object HTMLInputElement]"

    # use factory to build the  needed service sent as the service_param
    fashion_service = FashionServiceFactory.build(service_name=service)
    # before use the LLM model check caching
    cache_key = celebrity_name.lower() + ' ' + service + '_celeb_fashion'
    cached_data = cache_provider.get_cached_data(cache_key)
    if cached_data:
        print(f"found cached data of {celebrity_name}")
        return {'service': service, 'celeb_name': celebrity_name, 'response': CelebFashion(**cached_data)}

    print(f"haven't found {celebrity_name} in cached data")

    collection_name = f'{service}' + '_celeb_fashion'

    # # if the data not in the cache will first put in in the db and then fetch the document and return it
    fetch_result = await fashion_service.fetch_db_celeb_fashion(celebrity_name, collection_name)
    if fetch_result:
        print(f"found data in the database for {celebrity_name}")
        # Cache the data
        cache_provider.cache_data(cache_key, fetch_result)
        return {'service': service, 'celeb_name': celebrity_name, 'response': fetch_result}

    print("start llm")
    # init and use the LLM model for fashion prediction
    llm_response = fashion_llm.get_llm_prediction(celebrity_name)
    # print("-----------------llm response-----------")
    # print(llm_response)
    scraped_data = fashion_service.scrape_celeb_fashion_data(llm_response)
    result = scraped_data.dict()
    try:

        put_result = await fashion_service.put_db_celeb_fashion(celebrity_name, collection_name, result)
        cache_provider.cache_data(cache_key, scraped_data)
        return {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    except Exception as e:

        return {f'db put_celeb_fashion caught an error from db.get_celeb_fashion ': str(e),
                'celeb_name': celebrity_name}


# # We need to have an independent database session/connection (SessionLocal) per request,
# # use the same session through all the request and then close it after the request is finished.
# # so we will pass the db: Session with the get_db func as dependency
# @router.post("/avivohayon/fashionai/sign-up/")
# async def sign_up(user: User, db: Session = Depends(get_db)):
#     if not (user.user and user.email and user.pwd):
#         raise HTTPException(status_code=400, detail="User, Email, and Password are required")
#
#     user_manager = UsersManager(db)
#     try:
#
#         user_manager.create_user(user)
#         return {"success": f"New user {user.user} created"}
#
#     except HTTPException as e:
#         raise HTTPException(status_code=e.status_code, detail=e.detail)
#

@router.put("/avivohayon/fashionai/data{id}")
async def put_fashion_data(id, data):
    return 1

@router.post("/avivohayon/fashionai/data{id}")
async def delete_fashion_data(id):
    return 1



