from typing import Dict, Any
from dataclasses import dataclass

@dataclass
class AIJsonLikeData:

    name: str
    gender: str
    hat: str
    glasses: str
    jewelry: str
    tops: str
    pants: str
    shoes: str
    colors: str
    conclusion: str

"""
 this is a custom data structure i engineered to received from the llm after parsing and predicting
 i did it cuz ill need to use this specific dict (json like) structure for the future scraping and that make sure
 the user know exactly what the keys he need to work with need to get and received in some functions
 example :
 {'name': 'Bianca Del Rio',
 'gender': 'Women',
 'hat': 'Fedora hats, Wide-brimmed hats, Baseball caps',
 'glasses': 'Cat-eye sunglasses, Oversized sunglasses, Round sunglasses',
 'jewelry': 'Statement earrings, Chunky necklaces, Cuff bracelets',
 'tops': 'Crop tops, Graphic tees, Sequin blouses, Leather jackets',
 'pants': 'Skinny jeans, High-waisted pants, Wide-leg trousers, Jumpsuits',
 'shoes': 'Stiletto heels, Platform boots, Sneakers, Sandals',
 'colors': 'Black, Red, Gold, Silver, Bold colors such as purple and green',
 'conclusion': "Bianca Del Rio's style is all about making a statement...
 }
"""

