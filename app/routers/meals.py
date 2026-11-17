
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone

from app.database import get_db
from app.models import Meal, User
from app.schemas import MealCreate, MealResponse
from app.dependencies import get_current_user

router = APIRouter(prefix="/meals", tags=["Meal Tracking"])


@router.post("/", response_model=MealResponse)
def add_meal(
    data: MealCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if data.meal_type not in {
        "Breakfast", "Lunch", "Dinner", "Snacks"
    }:
        raise HTTPException(400, "Invalid meal type")

    meal = Meal(
        **data.model_dump(),
        user_id=current_user.id
    )

    db.add(meal)
    db.commit()
    db.refresh(meal)

    return meal


@router.get("/", response_model=list[MealResponse])
def get_meals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Meal).filter(
        Meal.user_id == current_user.id
    ).order_by(Meal.created_at.desc()).all()


@router.get("/daily-summary")
def daily_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    today = datetime.now(timezone.utc).date()

    totals = db.query(
        func.coalesce(func.sum(Meal.calories), 0),
        func.coalesce(func.sum(Meal.protein), 0),
        func.coalesce(func.sum(Meal.carbs), 0),
        func.coalesce(func.sum(Meal.fats), 0)
    ).filter(
        Meal.user_id == current_user.id,
        func.date(Meal.created_at) == today.isoformat()
    ).first()

    return {
        "date": today.isoformat(),
        "total_calories": round(totals[0], 2),
        "total_protein": round(totals[1], 2),
        "total_carbs": round(totals[2], 2),
        "total_fats": round(totals[3], 2)
    }


@router.delete("/{meal_id}")
def delete_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    meal = db.query(Meal).filter(
        Meal.id == meal_id,
        Meal.user_id == current_user.id
    ).first()

    if not meal:
        raise HTTPException(
            404,
            "Meal not found or you do not own this meal"
        )

    db.delete(meal)
    db.commit()

    return {"message": "Meal deleted successfully"}
