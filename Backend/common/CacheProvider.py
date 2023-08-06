import json

import redis
from typing import Optional
from ..fashion_api.models import CelebFashion, Item

class CacheProvider:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.redis_client = None
        return cls._instance

    def create_redis_client(self):
        self.redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

    def get_cached_data(self, key:str):
        if self.redis_client is None:
            self.create_redis_client()

        cached_data = self.redis_client.get(key)
        if cached_data:
            return json.loads(cached_data)

    def cache_data(self, key: str, data, expiration: int = 604800):
        """
        cache the data
        :param key: string - "celebrity name + service"
        :param data: CelebFashion structure data
        :param expiration: 1 week expiration by default. can be changed
        :return:
        """
        if self.redis_client is None:
            self.create_redis_client()

        # Set data in Redis cache with a timeout
        self.redis_client.setex(key, expiration, json.dumps(data.dict()))

        # checking that the data has been cached, will delete latter
        cached_data = self.redis_client.get(key)
        # print(f"cached data is: {cached_data}")

