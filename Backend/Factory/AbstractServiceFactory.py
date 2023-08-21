from abc import ABCMeta, abstractmethod

from Backend.FashionServices.IFashionService import IFashionService


class AbstractServiceFactory(metaclass=ABCMeta):
    """
    abstract factory, we can only build the Fashion Service obj by using the matching factory class
    that factory class have to inherit this class and implement the 'build_service' method
    which return a Fashion Service object that implement the IFashionService interface
    """
    @staticmethod
    @abstractmethod
    def build_service() -> IFashionService:
        pass
