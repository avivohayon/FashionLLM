from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from Backend.fashion_api.models import CelebFashion
from Backend.FashionServices.IFashionService import IFashionService
from fastapi.responses import JSONResponse
from Backend.common.UserDataBaseProvider import SessionLocal, engine
from Backend.UsersManager.UsersManager import UsersManager
from Backend.UsersManager.auth import Settings
from fastapi_jwt_auth import AuthJWT

router = APIRouter(
    prefix='/user',
    tags=['user'],

)

@AuthJWT.load_config
def get_config():
    return Settings()

# Dependency
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



@router.get("/avivohayon/fashionai/user-fashion")
async def fetch_user_saved_data(target_name: str, collection_name: str) -> CelebFashion:
    """
    user url endpoint for retriving the data from the mongodb
    :param target_name: target name (i.e celebrity_name like jay z)
    :param collection_name: the name of the collection it saved in
    :return: the CelebFashion object as a json dict
    """
    result = await IFashionService.fetch_db_celeb_fashion(target_name, collection_name)
    print("async def fetch_user_saved_data")
    print(f"result: {result.celebrity_name, result.conclusion}")
    return result



@router.get("/avivohayon/fashionai/user-list")
async def get_user_searched_list(user_manager : UsersManager = Depends(get_db_manager), Authorize: AuthJWT = Depends()):
    """
    user url endpoint for listing the user searched data
    :param user_name: the user name to fetch the searched data for
    :param user_manager: dependancy for user manger
    :return: json dict with key: collection_name (in mongodb), val: list of string: [target_name i..]
    """
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT Token get_fashion_llm_page")

        # get the data from the cur log in user (based on the given jwt token cookie)
    current_user = Authorize.get_jwt_subject()
    data_dict = user_manager.get_saved_fashion_collection(current_user)
    # #TODO
    # # check api count > 0 from the users db


    # # #TODO
    # # # update the api count =-1 in the users db and return it or handle it other way
    print(data_dict)
    return JSONResponse(data_dict)