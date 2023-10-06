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
from Backend.FashionServices.IFashionService import IFashionService
import asyncio

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


def celeb_caching(celebrity_name: str, service: str, current_user: str,  db_manger: UsersManager):
    cache_key = celebrity_name.lower() + ' ' + service + '_celeb_fashion'
    cached_data = cache_provider.get_cached_data(cache_key)
    collection_name = f'{service}' + '_celeb_fashion'
    if cached_data:
        print(f"found cached data of {celebrity_name}")
        # if db_manger.check_if_already_searched(current_user, collection_name, celebrity_name):
        #     _ = db_manger.save_fashion_collection(current_user, collection_name, celebrity_name)

        return {'service': service, 'celeb_name': celebrity_name, 'response': CelebFashion(**cached_data)}

    return False


async def celeb_db(fashion_service: IFashionService, celebrity_name: str, service:str, collection_name: str,
                   current_user: str, db_manger: UsersManager):

    fetch_result = await fashion_service.fetch_db_celeb_fashion(celebrity_name, collection_name)
    cache_key = celebrity_name.lower() + ' ' + service + '_celeb_fashion'

    if fetch_result:
        print(f"found data in the database for {celebrity_name}")
        # Cache the data
        cache_provider.cache_data(cache_key, fetch_result)
        # if db_manger.check_if_already_searched(current_user, collection_name, celebrity_name):
        #     _ = db_manger.save_fashion_collection(current_user, collection_name, celebrity_name)

        return {'service': service, 'celeb_name': celebrity_name, 'response': fetch_result}
    return False


#TODO send a jwt token to each of our main application api functions
@router.get("/avivohayon/fashionai/data/{service}")
async def get_celeb_fashion(service:str, celebrity_name: str, fashion_llm: FashionAi = Depends(get_cele_fashion_llm),
                            db_manger : UsersManager = Depends(get_db_manager),Authorize: AuthJWT = Depends()):
    """
    main up backend funcunality exposed url for get request via the forntend,
    :param service: the chosen fashion website service
    :param celebrity_name: the name of the celebrity from the user
    :param fashion_llm: no need to send as a query parameter as its inited when the server run
    :return: {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    """
    try:
            Authorize.jwt_required()
    except Exception as e:

        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token #get_celeb_fashion")

    print("Get_Celeb_Fashion start ")
    if celebrity_name == "":
        return
    print('start post test')
    if "[object HTMLInputElement]" == celebrity_name:
        return "[object HTMLInputElement]"

    # use factory to build the  needed service sent as the service_param
    fashion_service = FashionServiceFactory.build(service_name=service)
    current_user = Authorize.get_jwt_subject()  # get the data from the cur log in user (based on the givien jwt token cookie)
    collection_name = f'{service}' + '_celeb_fashion'

    # before use the LLM model check caching
    cache_result = celeb_caching(celebrity_name, service, current_user, db_manger)
    if cache_result: return cache_result # in not in the cache the result will be false

    print(f"haven't found {celebrity_name} in cached data")
    #  if the data not in the cache will first put in in the db and then fetch the document and return it
    db_result = await celeb_db(fashion_service, celebrity_name, service, collection_name, current_user, db_manger)
    if db_result: return db_result

    print("start llm")
    # init and use the LLM model for fashion prediction
    llm_response = fashion_llm.get_llm_prediction(celebrity_name)
    # print("-----------------llm response-----------")
    # print(llm_response)
    scraped_data = fashion_service.scrape_celeb_fashion_data(llm_response)
    result = scraped_data.dict()
    try:
        cache_key = celebrity_name.lower() + ' ' + service + '_celeb_fashion'
        put_result = await fashion_service.put_db_celeb_fashion(celebrity_name, collection_name, result)
        cache_provider.cache_data(cache_key, scraped_data)
        Authorize.jwt_required()
        current_user = Authorize.get_jwt_subject()  # get the data from the cur log in user (based on the givien jwt token cookie)

        _ = db_manger.save_fashion_collection(current_user, collection_name, celebrity_name)

        return {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    except HTTPException as http_error:
        if http_error.status_code == 500:
            # Handle the 500 status code exception from db_manger.save_fashion_collection
            raise HTTPException(status_code=500, detail="Internal MySQL server error")
        if http_error.status_code == 401:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token #get_celeb_fashion")

        else:
            # Handle other HTTPException status codes if necessary
            return {'status_code': http_error.status_code,
                    'detail': http_error.detail}  # Send the error details to the frontend
    except Exception as e:

        return {'error': str(e),
                'celeb_name': celebrity_name}

@router.get("/avivohayon/fashionai/test/{celebrity_name}")
async def get_test(celebrity_name: str, fashion_llm: FashionAi = Depends(get_cele_fashion_llm),
                            db_manger : UsersManager = Depends(get_db_manager)):

    service = 'asos'
    print("Get_Celeb_Fashion start ")
    if celebrity_name == "":
        return
    print('start post test')
    # if "[object HTMLInputElement]" == celebrity_name:
    #     return "[object HTMLInputElement]"

    # use factory to build the  needed service sent as the service_param
    fashion_service = FashionServiceFactory.build(service_name="asos")
    collection_name = 'asos' + '_celeb_fashion'

    # before use the LLM model check caching
    cache_result = celeb_caching(celebrity_name, "asos", "", db_manger)
    if cache_result: return cache_result  # in not in the cache the result will be false

    print(f"haven't found {celebrity_name} in cached data")
    #  if the data not in the cache will first put in in the db and then fetch the document and return it
    db_result = await celeb_db(fashion_service, celebrity_name, service, collection_name, '', db_manger)
    if db_result: return db_result

    print("start llm")
    # init and use the LLM model for fashion prediction
    llm_response = fashion_llm.get_llm_prediction(celebrity_name)
    # print("-----------------llm response-----------")
    # print(llm_response)
    scraped_data = fashion_service.scrape_celeb_fashion_data(llm_response)
    result = scraped_data.dict()
    try:
        cache_key = celebrity_name.lower() + ' ' + service + '_celeb_fashion'
        put_result = await fashion_service.put_db_celeb_fashion(celebrity_name, collection_name, result)
        cache_provider.cache_data(cache_key, scraped_data)
        # Authorize.jwt_required()
        # current_user = Authorize.get_jwt_subject()  # get the data from the cur log in user (based on the givien jwt token cookie)

        # _ = db_manger.save_fashion_collection(current_user, collection_name, celebrity_name)

        return {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    except HTTPException as http_error:
        if http_error.status_code == 500:
            # Handle the 500 status code exception from db_manger.save_fashion_collection
            raise HTTPException(status_code=500, detail="Internal MySQL server error")
        if http_error.status_code == 401:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token #get_celeb_fashion")

        else:
            # Handle other HTTPException status codes if necessary
            return {'status_code': http_error.status_code,
                    'detail': http_error.detail}  # Send the error details to the frontend
    except Exception as e:

        return {'error': str(e),
                'celeb_name': celebrity_name}


# return {"response":id, "name": "aviv"}


@router.put("/avivohayon/fashionai/data{id}")
async def put_fashion_data(id, data):
    return 1

@router.post("/avivohayon/fashionai/data{id}")
async def delete_fashion_data(id):
    return 1



# if __name__ == "__main__":
#     get_user_data(user_name='aviv')
# async def fetch_user_saved_data(target_name:str, collection_name: str) -> CelebFashion:
#     result  = await IFashionService.fetch_db_celeb_fashion_2(target_name, collection_name)
#     print("async def fetch_user_saved_data")
#     print(f"result: {result.celebrity_name, result.conclusion}")
#     return result
#
# @router.get("/avivohayon/fashionai/user-searched")
# async def get_user_searched_list(user_name : str, user_manager : UsersManager = Depends(get_db_manager)):
#     data_dict = user_manager.get_saved_fashion_collection(user_name)
#     # #TODO
#     # # check api count > 0 from the users db
#
#
#     # # #TODO
#     # # # update the api count =-1 in the users db and return it or handle it other way
#     return JSONResponse(data_dict)
    # # Create a list of tasks to run concurrently
    # tasks = []
    # for collection_name, target_names in data_dict.items():
    #     for target_name in target_names:
    #         task = fetch_user_saved_data(target_name, collection_name)
    #         tasks.append(task)
    #
    # # Execute tasks concurrently and wait for all to complete
    # try:
    #
    #     results = await asyncio.gather(*tasks)
    #     celeb_fashion_dict = {collection_name: celeb_fashion for collection_name, celeb_fashion in results if
    #                           celeb_fashion}
    #
    # except asyncio.CancelledError:
    #     print("CANCELED ")
    # except asyncio.TimeoutError:
    #     print("TIME OUT")

    # Handle results as needed
    # For example, you can create a dictionary with collection_name as keys and CelebFashion objects as values
    # celeb_fashion_dict = {collection_name: celeb_fashion for collection_name, celeb_fashion in results if celeb_fashion}

