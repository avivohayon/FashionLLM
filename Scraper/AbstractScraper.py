from abc import ABCMeta, abstractstaticmethod, abstractmethod
from data.DataClasses import AIJsonLikeData
import requests


class AbstractScraper(metaclass=ABCMeta):

    @staticmethod
    def _get_needed_colors(json: AIJsonLikeData, colors_set: set[str]) -> list[str]:
        """
           return a list of all the needed colors to search
           :param colors_set:
           :param json: json dict of the fashion format
           :return: list of all the colors needed to search
       """
        json_colors = json['colors'].split(', ')
        result_colors = []
        for element in json_colors:
            split_words = element.split(' ')
            result_colors.extend(split_words)

        result_colors = [word.capitalize() for word in result_colors]
        color_intersection_list = [color for color in result_colors if color in colors_set]
        return color_intersection_list



    @abstractmethod
    ## it will be the get api for the asos interface (abstract class) that need to implement
    def _get_celeb_fashion_data(self, product: str=None,
                                colors: list[str]=None, gender: str=None) -> requests.models.Response:
        pass

    @abstractmethod
    def scrape_celeb_fashion_data(self, ai_json_like_data: AIJsonLikeData) -> dict[str:str]:
        pass
