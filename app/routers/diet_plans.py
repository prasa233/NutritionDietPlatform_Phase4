
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import DietPlan, UserDietPlan, User
from app.schemas import DietPlanCreate, DietPlanResponse
from app.dependencies import get_current_user

router = APIRouter(prefix="/diet-plans", tags=["Diet Plans"])

VALID_GOALS = {"Weight Loss", "Muscle Gain", "Maintenance"}


@router.post("/", response_model=DietPlanResponse)
def create_diet_plan(
    data: DietPlanCreate,
    db: Session = Depends(get_db)
):
    if data.goal_type not in VALID_GOALS:
        raise HTTPException(400, "Invalid goal type")

    plan = DietPlan(**data.model_dump())

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan


@router.get("/", response_model=list[DietPlanResponse])
def get_diet_plans(db: Session = Depends(get_db)):
    return db.query(DietPlan).all()


@router.get("/{plan_id}", response_model=DietPlanResponse)
def get_diet_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):
    plan = db.query(DietPlan).filter(
        DietPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(404, "Diet plan not found")

    return plan


@router.post("/assign/{plan_id}")
def assign_diet_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):
    plan = db.query(DietPlan).filter(
        DietPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail=f"Diet plan with ID {plan_id} not found"
        )

    return {
        "message": "Diet plan found successfully",
        "diet_plan_id": plan.id,
        "title": plan.title
    }


@router.get("/user/my-plans")
def my_diet_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = db.query(UserDietPlan).filter(
        UserDietPlan.user_id == current_user.id
    ).all()

    return [
        {
            "assignment_id": item.id,
            "diet_plan": db.query(DietPlan).filter(
                DietPlan.id == item.diet_plan_id
            ).first()
        }
        for item in records
    ]
