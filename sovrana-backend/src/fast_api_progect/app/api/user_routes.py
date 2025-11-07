from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .crud import get_users, create_user
from .schemas import User, UserCreate

router = APIRouter()

@router.get("/", response_model=list[User])
async def read_users(db: Session = Depends(get_db)):
    users = get_users(db)
    return users

@router.post("/", response_model=User)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user)