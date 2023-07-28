from Backend.Factory.AbstractServiceFactory import AbstractServiceFactory
from Backend.FashionServices.IFashionService import IFashionService
from Backend.FashionServices.SheinService import SheinService


class SheinFactory(AbstractServiceFactory):
    @staticmethod
    def build_service() -> IFashionService:
        return SheinService()
