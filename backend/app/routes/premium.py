from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel

from app.database import get_db
from app.models.user import User
from app.models.premium import Premium

router = APIRouter(prefix="/premium", tags=["premium"])


PLANS = {
    "premium_30d": 30,
    "premium_90d": 90,
    "premium_180d": 180,
    "premium_365d": 365
}


class PremiumPurchaseRequest(BaseModel):
    user_id: int
    plan: str


@router.post("/buy")
def buy_premium(data: PremiumPurchaseRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == data.user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.plan not in PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")

    days = PLANS[data.plan]

    premium = db.query(Premium).filter(Premium.user_id == data.user_id).first()

    if not premium:
        premium = Premium(
            user_id=data.user_id,
            is_active=True,
            start_date=datetime.utcnow(),
            end_date=datetime.utcnow() + timedelta(days=days)
        )
        db.add(premium)

    else:
        premium.is_active = True
        premium.start_date = datetime.utcnow()
        premium.end_date = datetime.utcnow() + timedelta(days=days)

    db.commit()
    db.refresh(premium)

    return {
        "status": "premium activated",
        "expires_on": premium.end_date
    }
