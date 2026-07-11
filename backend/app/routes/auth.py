from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel
import hashlib

from app.database import get_db
from app.models.user import User


router = APIRouter(tags=["auth"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


class RegisterRequest(BaseModel):
    full_name: str
    username: str
    phone_number: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.username == data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="این نام کاربری قبلاً انتخاب شده است")

    existing_phone = db.query(User).filter(User.phone_number == data.phone_number).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="این شماره موبایل قبلاً ثبت شده است")

    try:
        new_user = User(
            full_name=data.full_name,
            username=data.username,
            phone_number=data.phone_number,
            password_hash=hash_password(data.password),
            role="user"
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "registered",
            "id": new_user.id,
            "username": new_user.username,
            "full_name": new_user.full_name,
            "phone_number": new_user.phone_number,
            "role": new_user.role
        }

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="خطا در ثبت اطلاعات")


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.username == data.username).first()

    if not user or user.password_hash != hash_password(data.password):
        raise HTTPException(status_code=400, detail="نام کاربری یا رمز عبور اشتباه است")

    return {
        "message": "logged in",
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "role": user.role
    }