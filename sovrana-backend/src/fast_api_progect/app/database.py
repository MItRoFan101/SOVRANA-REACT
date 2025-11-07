# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Настройки для Docker PostgreSQL
POSTGRES_USER = "sovrana_user"
POSTGRES_PASSWORD = "sovrana_password"
POSTGRES_DB = "sovrana_db"
POSTGRES_HOST = "localhost"  # или "postgres" если backend тоже в Docker
POSTGRES_PORT = "5432"

SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()