from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.user import User

router = APIRouter(prefix="/users", tags=["users"])


# -------------------------
# Schemas
# -------------------------

class UserCreate(BaseModel):
    full_name: str
    username: str
    phone_number: str
    password: str


class UserRead(BaseModel):
    id: int
    full_name: str
    username: str
    phone_number: str
    role: str | None = None

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


# -------------------------
# Register
# -------------------------

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):

    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already exists")

    existing_phone = db.query(User).filter(User.phone_number == user_data.phone_number).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    new_user = User(
        full_name=user_data.full_name,
        username=user_data.username,
        phone_number=user_data.phone_number,
        password_hash=user_data.password,
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# -------------------------
# Login
# -------------------------

@router.post("/login")
def login_user(login_data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.username == login_data.username).first()

    if not user or user.password_hash != login_data.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    return {
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "message": "Login successful"
    }


# -------------------------
# Get all users
# -------------------------

@router.get("/", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
