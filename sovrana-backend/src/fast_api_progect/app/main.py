from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Подключаем статику (файлы из dist/assets)
app.mount("/static", StaticFiles(directory=os.path.join(os.getcwd(), "dist/assets")), name="static")

# Фейковая база данных
users_db = []

# Модели данных для пользователей
class UserCreate(BaseModel):
    name: str
    email: str

class User(UserCreate):
    id: int

# Главная страница (возвращает index.html для React)
@app.get("/")
async def root():
    return FileResponse(os.path.join("dist", "index.html"))

# Этот маршрут перехватывает все остальные маршруты для правильной работы React Router
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return FileResponse(os.path.join("dist", "index.html"))

# Получение всех пользователей
@app.get("/users/", response_model=List[User])
async def get_users():
    return users_db

# Получение пользователя по ID
@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = next((user for user in users_db if user["id"] == user_id), None)
    if user is None:
        return {"error": "User not found"}
    return user

# Создание нового пользователя
@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    new_id = max([u["id"] for u in users_db], default=0) + 1  # Новый ID
    new_user = User(id=new_id, name=user.name, email=user.email)
    users_db.append(new_user.dict())  # Добавляем пользователя в базу данных
    return new_user

# Обновление пользователя по ID
@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserCreate):
    for u in users_db:
        if u["id"] == user_id:
            u["name"] = user.name
            u["email"] = user.email
            return u
    return {"error": "User not found"}

# Удаление пользователя по ID
@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    global users_db
    users_db = [u for u in users_db if u["id"] != user_id]
    return {"message": "User deleted"}
