# schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class User(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True  # В новых версиях Pydantic вместо orm_mode