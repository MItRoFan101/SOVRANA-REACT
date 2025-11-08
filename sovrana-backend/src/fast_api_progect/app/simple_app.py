from fastapi import FastAPI
from fastapi.responses import FileResponse  # Добавьте этот импорт
from fastapi.staticfiles import StaticFiles
import os
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Убедитесь, что путь правильный, и папка dist/assets существует
app.mount("/static", StaticFiles(directory="dist/assets"), name="static")






@app.get("/")
async def root():
    # Путь к вашему скомпилированному index.html
    index_path = os.path.join("dist", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"detail": "index.html not found"}

# Простые модели Pydantic без БД
class UserCreate(BaseModel):
    name: str
    email: str

class User(BaseModel):
    id: int
    name: str
    email: str

fake_users_db = [
    {"id": 1, "name": "John Doe", "email": "john@example.com"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
]

@app.get("/users/", response_model=List[User])
async def get_users():
    return fake_users_db

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = next((user for user in fake_users_db if user["id"] == user_id), None)
    if user is None:
        return {"error": "User not found"}
    return user

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    new_id = max([u["id"] for u in fake_users_db]) + 1 if fake_users_db else 1
    new_user = {"id": new_id, "name": user.name, "email": user.email}
    fake_users_db.append(new_user)
    return new_user

@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserCreate):
    for u in fake_users_db:
        if u["id"] == user_id:
            u["name"] = user.name
            u["email"] = user.email
            return u
    return {"error": "User not found"}

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    global fake_users_db
    fake_users_db = [u for u in fake_users_db if u["id"] != user_id]
    return {"message": "User deleted"}
users_db = fake_users_db