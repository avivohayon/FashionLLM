
from ..FashionServices.IFashionService import IFashionService
from Scraper.AsosScraper.AsosScraper import AsosScraper
from data.DataClasses import AIJsonLikeData
from ..fashion_api.models import CelebFashion, Item
from Backend.common.DatabaseProvider import DatabaseProvider
from pymongo.results import InsertOneResult


class AsosService(IFashionService):

    def __init__(self):
        super().__init__()
        self._scraper = AsosScraper()

    def print_hit(self):
        print('asosService')
        self._scraper.print_hi()

    def scrape_celeb_fashion_data(self, ai_json_like_data: AIJsonLikeData) -> CelebFashion:
        return CelebFashion(**self._scraper.scrape_celeb_fashion_data(ai_json_like_data))

    async def fetch_db_celeb_fashion(self, celebrity_name: str, collection_name: str) -> CelebFashion | None:
        db_provider = DatabaseProvider()
        collection = db_provider.get_collection(collection_name)

        document = await collection.find_one(
            {"celebrity_name": celebrity_name.lower()},
            projection={"_id": False}
        )
        if document:
            print(f'AsosService - found the item with the celeb name:{celebrity_name}')
            return CelebFashion(**document)
        else:
            return None
        raise Exception(f'AsosService - MongoDB set_celeb_fashion error. item: {celebrity_name} not in the db ')


    async def put_db_celeb_fashion(self, celebrity_name: str, collection_name: str,
                                        scraped_data: dict[str, str]) -> InsertOneResult:

        db_provider = DatabaseProvider()
        collection = db_provider.get_collection(collection_name)
        celeb_fashion = CelebFashion(**scraped_data)
        celeb_fashion.celebrity_name = celebrity_name.lower()
        db_result = await collection.insert_one(celeb_fashion.dict())
        if db_result:
            print(f" AsosService - put item with the celeb name:{celebrity_name} and _id of: {db_result}")
            return db_result
        # print('Inserted ID:', db_result.inserted_id)
        raise Exception(
            f'AsosService - MongoDB put_celeb_fashion error. item: {celebrity_name} theres problem with db_result: {db_result} ')


# if __name__ =='__main__':
#     asos = AsosService()
#     asos.print_hi()

