from fastapi import APIRouter, Depends, HTTPException
from Backend.Factory.FashionServiceFactory import FashionServiceFactory
from Backend.common.CacheProvider import CacheProvider
from Backend.fashion_api.models import CelebFashion
from Backend.Fashion_Ai.fashion_ai import FashionAi
from Backend.common.UserDataBaseProvider import SessionLocal, engine
from Backend.database.UserModelTable import UserEntity, Base
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from Backend.UsersManager.UsersManager import UsersManager
cache_provider = CacheProvider()
router = APIRouter()

Base.metadata.create_all(bind=engine)



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
            {"user": "aviv", "email": "aviv@gmail.com", "hashed_pwd": "123"},
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





@router.get("/avivohayon/fashionai/data/{service}")
async def get_celeb_fashion(service, celebrity_name: str):
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
    #
    #     # return CelebFashion(**cached_data)
    print(f"haven't found {celebrity_name} in cached data")

    collection_name = f'{service}' + '_celeb_fashion'

    # # if the data not in the cache will first put in in the db and then fetch the document and return it
    fetch_result = await fashion_service.fetch_db_celeb_fashion(celebrity_name, collection_name)
    if fetch_result:
        print(f"found data in the database for {celebrity_name}")
        # Cache the data
        # cache_provider.cache_data(cache_ksey, fetch_result)
        return {'service': service, 'celeb_name': celebrity_name, 'response': fetch_result}

    print("start llm")
    # init and use the LLM model for fashion prediction
    fashion_llm = FashionAi()
    llm_response = fashion_llm.get_llm_prediction(celebrity_name)
    # print("-----------------llm response-----------")
    # print(llm_response)



    print('start scraping from api call2')
    scraped_data = fashion_service.scrape_celeb_fashion_data(llm_response)
    result = scraped_data.dict()



    try:


        put_result = await fashion_service.put_db_celeb_fashion(celebrity_name, collection_name, result)
        cache_provider.cache_data(cache_key, scraped_data)

        return {'service': service, 'celeb_name': celebrity_name, 'response': scraped_data}
    except Exception as e:

        return {f'db put_celeb_fashion caught an error from db.get_celeb_fashion ': str(e),
                'celeb_name': celebrity_name}



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
        # return {"error": e.detail, "status_code": e.status_code}


    # # Hash the password (use a proper password hashing library)
    # hashed_password = "hash_function_here"  # Replace with actual hashing logic
    #
    # new_user = UserEntity(user_name=user.user_name, email=user.email, hashed_password=hashed_password)
    # db.add(new_user)
    # db.commit()

    # return {"success": f"New user {user.user_name} created"}

@router.put("/avivohayon/fashionai/data{id}")
async def put_fashion_data(id, data):
    return 1

@router.post("/avivohayon/fashionai/data{id}")
async def delete_fashion_data(id):
    return 1





# TODO stages for the post request
# async def post_fashion_data(celebrity_name: str) -> CelebFashion:
    # 1 -  check if the celebirty_name is in the cache.
    # 2 - check if the celbirty_name is already in the db if yes return this document
    # 3 -else send the celebrity name to the openAI api which i need to build a class for it
    # it will return something like this:
    # "'name': 'Bianca Del Rio',
    #  'gender': 'Women',
    #  'hat': 'Fedora hats, Wide-brimmed hats, Baseball caps',
    #  'glasses': 'Cat-eye sunglasses, Oversized sunglasses, Round sunglasses',
    #  'jewelry': 'Statement earrings, Chunky necklaces, Cuff bracelets',
    #  'tops': 'Crop tops, Graphic tees, Sequin blouses, Leather jackets',
    #  'pants': 'Skinny jeans, High-waisted pants, Wide-leg trousers, Jumpsuits',
    #  'shoes': 'Stiletto heels, Platform boots, Sneakers, Sandals',
    #  'colors': 'Black, Red, Gold, Silver, Bold colors such as purple and green',
    #  'conclusion': "Bianca Del Rio's style is
    # 4 -then will use the scraper which take this  string dict and turn it into
    # the dict with all the data needed from asos
    # 5-  will return that data
    # return 1

# importatn. the searching by attribute is case senetive. so when i insert the celeb name ill need
# to make it lowercase first. when i need to fetch a celeb name i need to also search the name with lower case

json_data = {'name': 'Ozzy Osbourne',
 'gender': 'Men',
 'hat': 'Wide-brimmed hats, Fedora hats, Top hats',
 'glasses': 'Round sunglasses, Aviator sunglasses, Rectangular glasses',
 'jewelry': 'Cross necklaces, Studded bracelets, Skull rings, Chain necklaces',
 'tops': 'Graphic tees, Leather jackets, Denim vests, Button-up shirts with bold prints',
 'pants': 'Black skinny jeans, Leather pants, Distressed denim, Cargo pants',
 'shoes': 'Combat boots, High-top sneakers, Loafers, Cowboy boots',
 'colors': 'Black, Dark shades of red, Purple, Silver, White',
 'conclusion': "Ozzy Osbourne's style is characterized by a mix of rock and roll and gothic influences."
               " Encourage your costumer to experiment with bold graphic tees, leather jackets, and black skinny jeans"
               " to capture Ozzy's edgy vibe. Accessorize with studded bracelets, cross necklaces, "
               "and skull rings. Opt for dark shades of red, purple, and silver to complement the black and white color scheme."
             }

json_data2 ={'name': 'RuPaul',
 'gender': 'Men',
 'hat': 'Wide-brimmed hats, Fedoras, Fascinators',
 'glasses': 'Oversized sunglasses, Cat-eye glasses, Rhinestone-encrusted glasses',
 'jewelry': 'Statement necklaces, Hoop earrings, Cuff bracelets, Brooches',
 'tops': 'Sequined blouses, Off-the-shoulder tops, Crop tops, Bold printed shirts',
 'pants': 'Wide-leg pants, Jumpsuits, High-waisted pants, Leather leggings',
 'shoes': 'Platform heels, Thigh-high boots, Metallic sandals, Sneakers with embellishments',
 'colors': 'Bold colors such as red, pink, and purple, Metallics, Black, White',
 'conclusion': "RuPaul's style is all about making a statement and embracing individuality. Encourage your costumer to experiment with bold prints, bright colors, and statement accessories. Opt for pieces that are form-fitting and show off your curves, and don't be afraid to mix and match different textures and patterns. Above all, remember to have fun and let your personality shine through your fashion choices!"
 }

json_data3 = {'name': 'Jay Z',
 'gender': 'Men',
 'hat': 'Snapback caps, Baseball caps, Fedora hats, Bucket hats',
 'glasses': 'Aviator sunglasses, Square-framed glasses, Clear lens glasses',
 'jewelry': 'Chunky gold chains, Diamond stud earrings, Statement rings, Watches',
 'tops': 'Button-up shirts with bold patterns, Graphic tees, Hoodies with logos, Leather jackets',
 'pants': 'Slim-fit jeans, Cargo pants, Track pants, Distressed denim',
 'shoes': 'Sneakers with high-tops, Chelsea boots, Loafers, Timberland boots',
 'colors': 'Black, White, Gray, Navy, Burgundy',
 'conclusion': "Jay Z's style is characterized by a mix of streetwear and luxury fashion. Encourage your customer to incorporate bold patterns, statement jewelry, and high-quality materials to capture Jay Z's confident and stylish look."
 }

json_data4 ={'name': 'Billie Eilish', 'gender': 'Women', 'hat': 'Bucket hats, Beanies, Oversized hats', 'glasses': 'Oversized sunglasses, Colored lenses, Retro frames', 'jewelry': 'Chunky chains, Hoop earrings, Statement rings', 'tops': 'Oversized hoodies, Baggy t-shirts, Crop tops, Graphic sweatshirts', 'pants': 'Baggy pants, Wide-leg trousers, Cargo pants, Joggers', 'shoes': 'Chunky sneakers, Platform boots, Slides, High-top sneakers', 'colors': 'Neon green, Black, White, Pastel colors, Bold colors such as red and blue', 'conclusion': "Billie Eilish's style is characterized by oversized and baggy clothing, often in bold and vibrant colors. Encourage your customer to experiment with layering and mixing different textures to achieve her unique and edgy look."}
