from pydantic import BaseModel
from typing import Dict, Union, List, Optional


class Item(BaseModel):
    name: str
    price: Optional[Dict[str, Union[float, str]]]
    brandName: Optional[str]
    url: str
    imageUrl: str


class CelebFashion(BaseModel):
    celebrity_name: str
    hat: List[Item]
    glasses: List[Item]
    jewelry: List[Item]
    tops: List[Item]
    pants: List[Item]
    shoes: List[Item]
    conclusion: str