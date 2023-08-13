from selenium import webdriver
from selenium.webdriver.common.by import  By
from selenium.webdriver.chrome.options import Options

import requests

class CelebImgScraper:
    def __init__(self):
        # Configure Chrome options for headless mode
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        # Start the Selenium WebDriver
        self._driver = webdriver.Remote("http://127.0.0.1:4444/wd/hub",desired_capabilities=chrome_options.to_capabilities())
        # Set the search URL
        self._search_url = "https://www.google.com/search?q={celebrity_name}&tbm=isch"

    def get_celeb_image(self, celebrity_name: str)-> str:
        """
        scrape the first image of a celebrity from google images
        :param celebrity_name: str represent the celebrity person for image to scrape
        :return: url for the celebrity image from google images
        """
        # Search for the celebrity on Google Images

        search_url = self._search_url.format(celebrity_name=celebrity_name)
        self._driver.get(search_url)

        # Find the first image element
        first_image = self._driver.find_element(By.XPATH, "//div[@id='islrg']//img")
        # Find the first image element
        image_url = first_image.get_attribute("src")
        # Get the image source URL
        return image_url

    def __del__(self):
        # Close the WebDriver when the object is destroyed
        self._driver.quit()

# if __name__ == "__main__":
#     scraper = CelebImgScraper()
#     celeb_scrap_arr = ["eric cartman", "queen elizabeth 2", "neil degrasse tyson", "jay z", "paris hilton", "rihanna",
#                        "katy perry", "britney spears", "kim kardashian", "miley cyrus", "kanya west", "taylor swift",
#                        "johnny depp", "michael jackson", "james brown", "alton mason", "jennifer aniston", "brad pitt",
#                        "angelina jolie", "netta", "billie eilish", "dennis rodman", "lady gaga", "john lennon", "ozzy osbourne"]
#
#     for celeb in celeb_scrap_arr:
#
#         image_url = scraper.get_celeb_image(celeb)
#         print(f"cur celeb is : {celeb} \n")
#         print(image_url)