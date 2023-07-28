from Backend.Factory.AsosFactory import AsosFactory
from Backend.Factory.SheinFactory import SheinFactory
from Backend.FashionServices.IFashionService import IFashionService


class FashionServiceFactory:
    """
    a singleton Factory class. it uses a staticmethod build which take advantage
    of the abstract factory implemented in  AbstractServiceFactory
    """
    __instance = None

    def __new__(cls):
        """
        The __new__() method is a special method in Python that is called to create a new instance of a class.
        By overriding this method, you can control how the instance is created and returned.
        """
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
        return cls.__instance

    @staticmethod
    def build(service_name: str) -> IFashionService:
        """
        static method which allow to create the service by its name easy
        for example like this : service = FashionServiceFactory.build('asos')
        :param service_name: string: the name of the fashion service
        :return: the needed FashionService class which implement the IFashionService interface
        """
        if service_name == 'asos':
            return AsosFactory.build_service()
        elif service_name == 'shein':
            return SheinFactory.build_service()
        else:
            raise Exception(f'the service: {service_name} doesnt exists')
