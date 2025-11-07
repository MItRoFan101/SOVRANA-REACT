# run.py
import sys
import os

# Добавляем путь к проекту в PYTHONPATH
sys.path.append(os.path.join(os.path.dirname(__file__), 'sovrana-backend', 'src'))

from fast_api_progect.app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run:app", host="127.0.0.1", port=8000, reload=True)    