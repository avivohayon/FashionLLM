from abc import ABCMeta, abstractstaticmethod, abstractmethod
from data.DataClasses import AIJsonLikeData
from Backend.fashion_api.models import CelebFashion
from pymongo.results import InsertOneResult
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
        pass

    @abstractmethod
    def print_hit(self):
        pass

    # access db servcies interface
    # methods might need to change it to static method and implement the logic here for avoid code duplication
    @abstractmethod
    async def fetch_db_celeb_fashion(self, celebrity_name: str, collection_name: str) -> CelebFashion | None:
        """
        this method get the needed document value from a generic celeb_fashion_collection
        :param collection_name: the name of the needed db collection to get data from
        :param celebrity_name: the name of the celebrity to get the data
        :return: the needed document in the CelebFashion form (without _id)
        """
        pass

    @abstractmethod
    async def put_db_celeb_fashion(self, celebrity_name: str, collection_name: str, scraped_data: dict[str, str]) \
            -> InsertOneResult:
        pass

