from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.heart import Heart
from app.models.user import User
from app.core.deps import get_current_user

router = APIRouter(prefix="/hearts", tags=["hearts"])


class HeartSchema(BaseModel):
    user_id: int
    heart_count: int

    class Config:
        from_attributes = True


# گرفتن تعداد قلب‌های خودِ کاربر لاگین‌کرده
@router.get("/me", response_model=HeartSchema)
def get_my_hearts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    heart = db.query(Heart).filter(Heart.user_id == current_user.id).first()

    if not heart:
        heart = Heart(user_id=current_user.id, heart_count=5)
        db.add(heart)
        db.commit()
        db.refresh(heart)

    return heart


# کم کردن قلب خودِ کاربر لاگین‌کرده
@router.post("/decrease")
def decrease_heart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    heart = db.query(Heart).filter(Heart.user_id == current_user.id).first()

    if not heart or heart.heart_count <= 0:
        raise HTTPException(status_code=400, detail="No hearts left")

    heart.heart_count -= 1
    db.commit()

    return {
        "message": "Heart decreased",
        "remaining": heart.heart_count
    }