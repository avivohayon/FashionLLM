import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from Scraper.AsosScraper import asos_meta_data
from data.DataClasses import AIJsonLikeData
from Scraper.AbstractScraper import AbstractScraper
from Scraper.GoogleImgScraper.CelebImgScraper import CelebImgScraper
json_data = {'name': 'Ozzy Osbourne',
 'gender': 'Men',
 'hat': 'Wide-brimmed hats, Fedora hats, Top hats',
 'glasses': 'Round sunglasses, Aviator sunglasses, Rectangular glasses',
 'jewelry': 'Cross necklaces, Studded bracelets, Skull rings, Chain necklaces',
 'tops': 'Graphic tees, Leather jackets, Denim vests, Button-up shirts with bold prints',
 'pants': 'Black skinny jeans, Leather pants, Distressed denim, Cargo pants',
 'shoes': 'Combat boots, High-top sneakers, Loafers, Cowboy boots',
 'colors': 'Black, Dark shades of red, Purple, Silver, White',
 'conclusion': "Ozzy Osbourne's style is characterized by a mix of rock and roll and gothic influences."
               " Encourage your costumer to experiment with bold graphic tees, leather jackets, and black skinny jeans"
               " to capture Ozzy's edgy vibe. Accessorize with studded bracelets, cross necklaces, "
               "and skull rings. Opt for dark shades of red, purple, and silver to complement the black and white color scheme."
             }

# Create a set of all colors

colors_set = {
            'White', 'Black', 'Blue', 'Multi', 'Green', 'Neutral', 'Pink',
            'Brown', 'Navy', 'Orange', 'Red', 'Purple', 'Grey', 'Yellow',
            'Silver', 'Gold', 'Copper', 'No colour', 'Auburn'
              }

json_keys = {'name', 'price', 'brandName', 'url', 'imageUrl'}


class AsosScraper(AbstractScraper):
    def __init__(self):
        super().__init__()  # im not sure if i need to user this super().__init__ so need tocheck
        self.__colors_set = colors_set
        self.__json_keys = json_keys

    def print_hi(self):
        print('asosScraper')

    # it will be the get api for the asos interface (abstract class) that need to implement
    def _get_celeb_fashion_data(self, product: str=None,
                                colors: list[str]=None, gender: str=None) -> requests.models.Response:
        """
        execute a get request to asos hidden api by given paramets
        :param product: product type name to search
        :param colors: list of color to search
        :param gender: gender to search
        :return: Response object with the needed items
        """

        cookies, headers, params = asos_meta_data.init_asos_request_metadata(product, colors, gender)
        response = requests.get('https://www.asos.com/api/product/search/v2/',
                                params=params, cookies=cookies, headers=headers)
        return response

    def scrape_celeb_fashion_data(self, ai_json_like_data: AIJsonLikeData) -> dict[str:str]:

        """
        Scrape the celeb fashion data from asos.com
        :param ai_json_like_data: the parsed response from the Fashion LLM model (has to be in that format!)
        :return: a dict with all the needed data to return and store to the db.
                for more descriptive structure go to CelebFashion in Backend.fashion_api.model
        """
        celebrity_name = ai_json_like_data['name']
        colors = super()._get_needed_colors(ai_json_like_data, self.__colors_set)
        gender = ai_json_like_data['gender']
        celebrity_data_dict = {'celebrity_name': celebrity_name}
        celebrity_data_dict['imageUrl']= CelebImgScraper().get_celeb_image(celebrity_name)
        # need to us like 4 thread for better executation for each product rather then one prodcut to all
        for item_key, value in ai_json_like_data.items():
            if item_key == 'conclusion':
                celebrity_data_dict[item_key] = ai_json_like_data['conclusion']
            elif item_key != 'name' and item_key != 'gender' and item_key != 'colors' and item_key != 'conclusion':
                new_data_list = []
                products = value.split(",")
                for product in products:
                    product = product.strip()

                    response = self._get_celeb_fashion_data(product, colors, gender).json()
                    for i in range(len(response['products'])):
                        cur_result = response['products'][i]

                        cur_data = {
                            'name': cur_result['name'],
                            'price': cur_result['price']['current'],
                            'brandName': cur_result['brandName'],
                            'url': cur_result['url'],
                            'imageUrl': cur_result['imageUrl']
                        }
                        new_data_list.append(cur_data)

                    celebrity_data_dict[item_key] = new_data_list

        print('---hat----')
        print(celebrity_data_dict['hat'][:2])
        print('---glasses----')
        print(celebrity_data_dict['glasses'][:2])
        print('---jewelry----')
        print(celebrity_data_dict['jewelry'][:2])
        print('---tops----')
        print(celebrity_data_dict['tops'][:2])
        print('---pants----')
        print(celebrity_data_dict['pants'][:2])
        print('---shoes----')
        print(celebrity_data_dict['shoes'][:2])
        print('---conclusion----')
        print(celebrity_data_dict['conclusion'])


        return celebrity_data_dict


if __name__ == '__main__':
    # json = json_data
    # cur_gender = json['gender']
    # CATEGORIES = ['hat', 'glasses', 'jewelry', 'tops', 'pants', 'shoes', 'colors']
    # celebrity_color_list = get_needed_colors(json_data)
    # print(celebrity_color_list)
    # product, colors, gender = 'Aviator sunglasses', ['Black', 'Red', 'Purple', 'Silver', 'White'], 'Men'
    # response = get(product, colors, gender)
    # print(response.json())
    colors = ['Black', 'Red', 'Purple', 'Silver', 'White']
    asosScraper = AsosScraper()
    asosScraper.scrape_celeb_fashion_data(json_data)
    # asosScraper._get_needed_colors(json_data)
    # asosScraper.scrape_celeb_fashion_data(json_data)

    # driver = webdriver.Chrome()
    # payload = 'hat'



# ------------------------ trash
    # def _get_needed_colors(self, json: AIJsonLikeData) -> list[str]:
    #     """
    #        return a list of all the needed colors to search
    #        :param json: json dict of the fashion format
    #        :return: list of all the colors needed to search
    #    """
    #     result = super()._get_needed_colors(json, self.__colors_set)
    #     print(f'super colors are: {result}')
    #     return result
    # json_colors = json['colors'].split(', ')
        # result_colors = []
        # for element in json_colors:
        #     split_words = element.split(' ')
        #     result_colors.extend(split_words)
        #
        # result_colors = [word.capitalize() for word in result_colors]
        # color_intersection_list = [color for color in result_colors if color in self.__colors_set]
        # return color_intersection_list
