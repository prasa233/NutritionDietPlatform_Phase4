
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, DietPlan, Meal, Subscription

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    try:
        total_users = db.query(User).count()
        total_plans = db.query(DietPlan).count()
        total_meals = db.query(Meal).count()
        total_subscriptions = db.query(Subscription).count()

        return {
            "totalUsers": total_users,
            "totalPlans": total_plans,
            "totalMeals": total_meals,
            "totalSubscriptions": total_subscriptions
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Dashboard summary error: {str(e)}"
        )
