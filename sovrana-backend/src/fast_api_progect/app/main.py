# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Модели
class UserCreate(BaseModel):
    name: str
    email: str

class User(BaseModel):
    id: int
    name: str
    email: str

# Фейковая БД
users_db = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

@app.get("/")
async def root():
    return {"message": "FastAPI без базы данных!"}

@app.get("/users/", response_model=List[User])
async def get_users():
    return users_db

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    return {"error": "User not found"}

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    new_id = max([u["id"] for u in users_db]) + 1
    new_user = User(id=new_id, name=user.name, email=user.email)
    users_db.append(new_user.dict())
    return new_user