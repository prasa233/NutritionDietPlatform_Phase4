
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database import get_db
from app.models import Subscription, UserSubscription, User
from app.schemas import SubscriptionCreate
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)

@router.post("/")
def create_subscription(
    data: SubscriptionCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(Subscription).filter(
        Subscription.name == data.name
    ).first()

    if existing:
        raise HTTPException(400, "Plan already exists")

    plan = Subscription(**data.model_dump())

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return {
        "message": "Subscription created successfully",
        "subscription": plan.name,
        "id": plan.id
    }

@router.get("/")
def get_subscriptions(db: Session = Depends(get_db)):
    return db.query(Subscription).all()

@router.post("/subscribe/{subscription_id}")
def subscribe(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan = db.query(Subscription).filter(
        Subscription.id == subscription_id
    ).first()

    if not plan:
        raise HTTPException(404, "Subscription not found")

    today = date.today()

    active = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.end_date >= today
    ).first()

    if active:
        active.subscription_id = plan.id
        active.start_date = today
        active.end_date = today + timedelta(days=plan.duration)
    else:
        active = UserSubscription(
            user_id=current_user.id,
            subscription_id=plan.id,
            start_date=today,
            end_date=today + timedelta(days=plan.duration)
        )
        db.add(active)

    db.commit()
    db.refresh(active)

    return {
        "message": "Subscription activated successfully",
        "plan": plan.name,
        "start_date": active.start_date,
        "end_date": active.end_date
    }

@router.get("/my-subscription")
def my_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    today = date.today()

    active = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.end_date >= today
    ).order_by(UserSubscription.end_date.desc()).first()

    if not active:
        return {"message": "No active subscription"}

    plan = db.query(Subscription).filter(
        Subscription.id == active.subscription_id
    ).first()

    return {
        "plan": plan.name,
        "price": plan.price,
        "start_date": active.start_date,
        "end_date": active.end_date,
        "status": "ACTIVE"
    }

@router.get("/history")
def subscription_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id
    ).all()