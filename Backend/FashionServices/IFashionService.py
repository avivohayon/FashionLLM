from abc import ABCMeta, abstractstaticmethod, abstractmethod
from data.DataClasses import AIJsonLikeData
from Backend.fashion_api.models import CelebFashion
from pymongo.results import InsertOneResult
from Backend.common.DatabaseProvider import DatabaseProvider

class IFashionService(metaclass=ABCMeta):
    """
    abstract interface for all the Fashion Service classes
    """

    @abstractmethod
    def __init__(self):
        self.scraper = None

    # scraper services interface methods
    @abstractmethod
    def scrape_celeb_fashion_data(self, ai_json_like_data: AIJsonLikeData) -> CelebFashion:
        """remark : the dict is in the pydantic structure of "CelebFashion" as defined in  models.py """
        pass

    @abstractmethod
    def print_hit(self):
        pass

    # access db servcies interface
    # methods might need to change it to static method and implement the logic here for avoid code duplication
    # @abstractmethod
    # async def fetch_db_celeb_fashion(self, celebrity_name: str, collection_name: str) -> CelebFashion | None:
    #     """
    #     this method get the needed document value from a generic celeb_fashion_collection
    #     :param collection_name: the name of the needed db collection to get data from
    #     :param celebrity_name: the name of the celebrity to get the data
    #     :return: the needed document in the CelebFashion form (without _id)
    #     """
    #     pass

    @abstractmethod
    async def put_db_celeb_fashion(self, celebrity_name: str, collection_name: str, scraped_data: dict[str, str]) \
            -> InsertOneResult:
        pass


    @staticmethod
    async def fetch_db_celeb_fashion(celebrity_name: str, collection_name: str) -> CelebFashion | None:
        db_provider = DatabaseProvider()
        collection = db_provider.get_collection(collection_name)

        document = await collection.find_one(
            {"celebrity_name": celebrity_name.lower()},
            projection={"_id": False}
        )
        if document:
            # print(f'AsosService - found the item with the celeb name:{celebrity_name}')
            return CelebFashion(**document)
        else:
            return None

    async def fetch_db_collection_data(self, target_name: str, collection_name: str) -> CelebFashion | None:
        db_provider = DatabaseProvider()
        collection = db_provider.get_collection(collection_name)

        document = await collection.find_one(
            {"celebrity_name": target_name.lower()},
            projection={"_id": False}
        )
        if document:
            print(f'IFashionService fetch_db_collection_data:{target_name}')
            return CelebFashion(**document)
        else:
            return None