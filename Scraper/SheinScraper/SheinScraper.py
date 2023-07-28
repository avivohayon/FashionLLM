import requests
from data.DataClasses import AIJsonLikeData
from Scraper.AbstractScraper import AbstractScraper
from Scraper.SheinScraper import shein_meta_data

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


colors_set = {
            'White', 'Black', 'Blue', 'Multi', 'Green', 'Neutral', 'Pink',
            'Brown', 'Navy', 'Orange', 'Red', 'Purple', 'Grey', 'Yellow',
            'Silver', 'Gold', 'Copper', 'No colour', 'Auburn',
            'Khaki'
              }
json_keys = {'name', 'price', 'brandName', 'url', 'imageUrl'}


class SheinScraper(AbstractScraper):

    def __init__(self):
        self.__colors_set = colors_set
        self.__json_keys = json_keys
        self._params = None

    def _get_celeb_fashion_data(self, product: str = None, colors: list[str] = None,
                                gender: str = None) -> requests.models.Response:

        cookies, headers, params = shein_meta_data.init_shein_request_metadata(product, colors, gender)
        response = requests.get('https://il.shein.com/api/productList/info/get',
                                params=params, cookies=cookies, headers=headers)
        self._params = params
        return response

    def scrape_celeb_fashion_data(self, ai_json_like_data: AIJsonLikeData) -> dict[str:str]:
        celebrity_name = ai_json_like_data['name']
        colors = super()._get_needed_colors(ai_json_like_data, self.__colors_set)
        gender = ai_json_like_data['gender']
        celebrity_data_dict = {'celebrity_name': celebrity_name}

        # need to us like 4 thread for better executation for each product rather then one prodcut to all
        for item_key, value in ai_json_like_data.items():
            if item_key == 'conclusion':
                celebrity_data_dict[item_key] = ai_json_like_data['conclusion']
            elif item_key != 'name' and item_key != 'gender' and item_key != 'colors' and item_key != 'conclusion':
                new_data_list = []
                products = value.split(",")
                for product in products:
                    product = product.strip()  # iremember t as strip but i copy as split and change so that miht be a bug

                    response = self._get_celeb_fashion_data(product, colors, gender).json()
                    for i in range(len(response['goods'])):
                        cur_result = response['goods'][i]
                        url_template = 'https://il.shein.com/{goods_url_name}-p-{goods_id}-cat-{cat_id}.html?' \
                                       'src_identifier={src_identifier}&attr_ids=27_81-27_334-27_2566-27_1000133-27_536' \
                                       '-27_1000117-27_330-27_762-27_1000111-27_118-27_1000112-27_1000120-27_1000134&mallCode=1'

                        goods_id = cur_result['goods_id']
                        cat_id = cur_result['cat_id']
                        goods_url_name = cur_result['goods_url_name']
                        src_identifier = self._params['src_identifier']

                        url = url_template.format(goods_url_name=goods_url_name, goods_id=goods_id, cat_id=cat_id,
                                                  src_identifier=src_identifier)

                        image_url = cur_result['goods_img']
                        cur_data = {
                            'name': goods_url_name,
                            'url': url,
                            'imageUrl': image_url
                        }
                        new_data_list.append(cur_data)

                    celebrity_data_dict[item_key] = new_data_list

        # print('---hat----')
        # print(celebrity_data_dict['hat'][:2])
        # print('---glasses----')
        # print(celebrity_data_dict['glasses'][:2])
        # print('---jewelry----')
        # print(celebrity_data_dict['jewelry'][:2])
        # print('---tops----')
        # print(celebrity_data_dict['tops'][:2])
        # print('---pants----')
        # print(celebrity_data_dict['pants'][:2])
        # print('---shoes----')
        # print(celebrity_data_dict['shoes'][:2])
        # print('---conclusion----')
        # print(celebrity_data_dict['conclusion'])

        return celebrity_data_dict






if __name__ == '__main__':

    colors = ['Black', 'Red', 'Purple', 'Silver', 'White']
    sheinScraper = SheinScraper()
    sheinScraper.scrape_celeb_fashion_data(json_data)

