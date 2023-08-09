from pydantic import BaseModel
from typing import Dict, Union, List, Optional

class User(BaseModel):
    user: str
    email: str
    pwd: str
    api_count: Optional[int]
    disabled : Optional[bool] or Optional[None] = None