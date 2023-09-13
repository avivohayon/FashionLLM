from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type : str


class TokenData(BaseModel):
    username: str or None = None

class UserLogin(BaseModel):
    username: str
    password: str