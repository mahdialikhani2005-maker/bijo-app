from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.progress import Progress
from app.models.user import User
from app.core.deps import get_current_user

router = APIRouter(prefix="/progress", tags=["progress"])


class XPRequest(BaseModel):
    lesson_slug: str
    amount: int


@router.post("/xp")
def add_xp(
    data: XPRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    progress = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.lesson_slug == data.lesson_slug
    ).first()

    if not progress:
        progress = Progress(
            user_id=current_user.id,
            lesson_slug=data.lesson_slug,
            xp=0,
            score=0,
            status="in_progress"
        )
        db.add(progress)

    progress.xp += data.amount

    db.commit()
    db.refresh(progress)

    return {"xp": progress.xp}