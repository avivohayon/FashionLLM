from pydantic import BaseModel
from typing import Dict, Union, List, Optional

"""
define the Users data structure received from the frontend 
"""
class User(BaseModel):
    user: str
    email: str
    pwd: str
    api_count: Optional[int]
    disabled : Optional[bool] or Optional[None] = None