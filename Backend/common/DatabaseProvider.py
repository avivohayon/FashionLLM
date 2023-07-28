import motor.motor_asyncio
from motor.motor_asyncio import AsyncIOMotorCollection

from typing import Optional
from ..fashion_api.models import CelebFashion, Item


class DatabaseProvider:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
            cls._instance.database = cls._instance.client.fashion_db
        return cls._instance

    def get_database(self) -> motor.motor_asyncio.AsyncIOMotorDatabase:
        return self.database

    def get_collection(self, collection_name: str) -> AsyncIOMotorCollection:
        return self.database[collection_name]
