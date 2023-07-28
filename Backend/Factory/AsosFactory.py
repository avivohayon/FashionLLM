from Backend.Factory.AbstractServiceFactory import AbstractServiceFactory
from Backend.FashionServices.IFashionService import IFashionService
from Backend.FashionServices.AsosService import AsosService


class AsosFactory(AbstractServiceFactory):
    @staticmethod
    def build_service() -> IFashionService:
        return AsosService()
