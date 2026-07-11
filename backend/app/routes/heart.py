from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.heart import Heart

router = APIRouter(prefix="/hearts", tags=["hearts"])


# نمایش اطلاعات قلب
class HeartSchema(BaseModel):
    user_id: int
    heart_count: int

    class Config:
        from_attributes = True


# گرفتن تعداد قلب‌های کاربر
@router.get("/{user_id}", response_model=HeartSchema)
def get_user_hearts(user_id: int, db: Session = Depends(get_db)):

    heart = db.query(Heart).filter(Heart.user_id == user_id).first()

    if not heart:
        heart = Heart(user_id=user_id, heart_count=5)
        db.add(heart)
        db.commit()
        db.refresh(heart)

    return heart


# کم کردن قلب
@router.post("/{user_id}/decrease")
def decrease_heart(user_id: int, db: Session = Depends(get_db)):

    heart = db.query(Heart).filter(Heart.user_id == user_id).first()

    if not heart or heart.heart_count <= 0:
        raise HTTPException(status_code=400, detail="No hearts left")

    heart.heart_count -= 1
    db.commit()

    return {
        "message": "Heart decreased",
        "remaining": heart.heart_count
    }
