# data base using MongoDB
# from Scraper import main
# connect the mongo_database.py to the mongoDB
from ..fashion_api.models import CelebFashion, Item
# MongoDB driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.fashion_db
collection = database.asos_celeb_fashion






async def fetch_fashion_data(celebrity_name: str):
    document = await collection.find_one({"celebrity_name": celebrity_name})
    return document


async def get_celeb_fashion(celebrity_name: str) -> CelebFashion:
    document = await collection.find_one(
        {"celebrity_name": celebrity_name},
        projection={"_id": False}
    )
    if document:
        print(f'found the item with the celeb name:{celebrity_name}')
        return CelebFashion(**document)
    raise Exception(f'MongoDB set_celeb_fashion error. item: {celebrity_name} not in the db ')
#
# async def create_fashion_data(celebrity_name:str):
#     print('----------')
#     result = main.scrape_data(main.json_data)
#     # print(result)
#     celeb_fashion = CelebFashion(**result)
#     db_result = await collection.insert_one(celeb_fashion.dict())
#     print('Inserted ID:', db_result.inserted_id)

    # celeb_fashion = CelebFashion(
    #     celebrity_name=result['celebrity_name'],
    #     hat=[
    #         Item(name=hat_data['name'],
    #         price=hat_data['price'],
    #         brandName=hat_data['brandName'],
    #         url=hat_data['url'],
    #         imageUrl=hat_data['imageUrl']) for hat_data in result['hat']
    #     ],
    #     glasses=[
    #         Item(name=glasses_data['name'],
    #         price=glasses_data['price'],
    #         brandName=glasses_data['brandName'],
    #         url=glasses_data['url'],
    #         imageUrl=glasses_data['imageUrl']) for glasses_data in result['glasses']
    #     ],
    #     jewelry=[
    #         Item(name=jewelry_data['name'],
    #         price=jewelry_data['price'],
    #         brandName=jewelry_data['brandName'],
    #         url=jewelry_data['url'],
    #         imageUrl=jewelry_data['imageUrl']) for jewelry_data in result['jewelry']
    #     ],
    #     tops=[
    #         Item(name=tops_data['name'],
    #         price=tops_data['price'],
    #         brandName=tops_data['brandName'],
    #         url=tops_data['url'],
    #         imageUrl=tops_data['imageUrl']) for tops_data in result['tops']
    #     ],
    #     pants=[
    #         Item(name=pants_data['name'],
    #         price=pants_data['price'],
    #         brandName=pants_data['brandName'],
    #         url=pants_data['url'],
    #         imageUrl=pants_data['imageUrl']) for pants_data in result['pants']
    #     ],
    #     shoes=[
    #         Item(name=shoes_data['name'],
    #         price=shoes_data['price'],
    #         brandName=shoes_data['brandName'],
    #         url=shoes_data['url'],
    #         imageUrl=shoes_data['imageUrl']) for shoes_data in result['shoes']
    #     ],
    #     conclusion=result['conclusion'],
    # )
    print('---------')
    # print(celeb_fashion)
