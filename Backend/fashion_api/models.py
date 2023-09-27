from pydantic import BaseModel
from typing import Dict, Union, List, Optional
import uuid

"""
define pydantic models for the api data structure
"""
class AiResult(BaseModel):
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

class Item(BaseModel):
    # id: uuid.UUID
    name: str
    price: Optional[Dict[str, Union[float, str]]]
    brandName: Optional[str]
    url: str
    imageUrl: str


""" data structure for saving the celeb fashion object into the MongoDB fashion_service collection"""
class CelebFashion(BaseModel):
    celebrity_name: str
    hat: List[Item]
    glasses: List[Item]
    jewelry: List[Item]
    tops: List[Item]
    pants: List[Item]
    shoes: List[Item]
    imageUrl: str
    conclusion: str


