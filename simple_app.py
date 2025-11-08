from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Получаем абсолютный путь к текущей директории
current_dir = os.path.dirname(os.path.abspath(__file__))
dist_path = os.path.join(current_dir, "dist")

print(f"Current directory: {current_dir}")
print(f"Dist path: {dist_path}")

# Проверяем содержимое dist папки
if os.path.exists(dist_path):
    print("Contents of dist folder:")
    for item in os.listdir(dist_path):
        item_path = os.path.join(dist_path, item)
        print(f"  - {item} ({'dir' if os.path.isdir(item_path) else 'file'})")
else:
    print("ERROR: dist folder not found!")
    raise Exception("Dist folder not found!")

# Монтируем статические файлы
assets_path = os.path.join(dist_path, "assets")
if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
    print("✓ Assets mounted at /assets")

# Также монтируем корень dist для любых других статических файлов
app.mount("/static", StaticFiles(directory=dist_path), name="static")
print("✓ Static files mounted at /static")

@app.get("/")
async def root():
    index_path = os.path.join(dist_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    else:
        raise HTTPException(status_code=404, detail="index.html not found")

# Обработчик для всех путей SPA - возвращает index.html
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Если путь начинается с api, пропускаем его для API endpoints
    if full_path.startswith('api/'):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    index_path = os.path.join(dist_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="Page not found")

# API endpoints
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

@app.get("/api/users/", response_model=List[User])
async def get_users():
    return fake_users_db

@app.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = next((user for user in fake_users_db if user["id"] == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/users/", response_model=User)
async def create_user(user: UserCreate):
    new_id = max([u["id"] for u in fake_users_db]) + 1 if fake_users_db else 1
    new_user = {"id": new_id, "name": user.name, "email": user.email}
    fake_users_db.append(new_user)
    return new_user

@app.put("/api/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserCreate):
    for u in fake_users_db:
        if u["id"] == user_id:
            u["name"] = user.name
            u["email"] = user.email
            return u
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int):
    global fake_users_db
    initial_length = len(fake_users_db)
    fake_users_db = [u for u in fake_users_db if u["id"] != user_id]
    if len(fake_users_db) == initial_length:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting server...")
    print("📁 Serving from:", dist_path)
    print("🌐 Open: http://127.0.0.1:8000")
    print("⏹️  Press CTRL+C to stop the server\n")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")