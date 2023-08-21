# data base using MongoDB
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

