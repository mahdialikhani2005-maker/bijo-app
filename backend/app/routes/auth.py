import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel

from app.database import get_db
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token


router = APIRouter(tags=["auth"])


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

        access_token = create_access_token(data={"sub": str(new_user.id)})

        return {
            "message": "registered",
            "access_token": access_token,
            "token_type": "bearer",
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

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="نام کاربری یا رمز عبور اشتباه است")

    access_token = create_access_token(data={"sub": str(user.id)})

    return {
        "message": "logged in",
        "access_token": access_token,
        "token_type": "bearer",
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "role": user.role
    }


# ساخت خودکار یه اکانت مهمان، برای کاربرایی که بدون ثبت‌نام
# می‌خوان از اپ استفاده کنن. قلب/XP همچنان از سرور کنترل میشه.
@router.post("/guest")
def create_guest(db: Session = Depends(get_db)):
    guest_suffix = uuid.uuid4().hex[:10]

    new_user = User(
        full_name="کاربر مهمان",
        username=f"guest_{guest_suffix}",
        phone_number=f"guest_{guest_suffix}",
        password_hash=hash_password(uuid.uuid4().hex),  # رمز تصادفی، هیچ‌وقت به کاربر نشون داده نمیشه
        role="guest"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": str(new_user.id)})

    return {
        "message": "guest created",
        "access_token": access_token,
        "token_type": "bearer",
        "id": new_user.id,
        "username": new_user.username,
        "full_name": new_user.full_name,
        "phone_number": new_user.phone_number,
        "role": new_user.role
    }