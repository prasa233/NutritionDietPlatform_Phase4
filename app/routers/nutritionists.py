
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.database import get_db
from app.models import Nutritionist, Consultation, User
from app.schemas import NutritionistCreate, ConsultationCreate
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/nutritionists",
    tags=["Nutritionist Consultation"]
)

@router.post("/")
def create_nutritionist(
    data: NutritionistCreate,
    db: Session = Depends(get_db)
):
    nutritionist = Nutritionist(**data.model_dump())

    db.add(nutritionist)
    db.commit()
    db.refresh(nutritionist)

    return {
        "message": "Nutritionist created successfully",
        "id": nutritionist.id,
        "name": nutritionist.name
    }

@router.get("/")
def get_nutritionists(db: Session = Depends(get_db)):
    return db.query(Nutritionist).all()

@router.get("/{nutritionist_id}")
def get_nutritionist(
    nutritionist_id: int,
    db: Session = Depends(get_db)
):
    nutritionist = db.query(Nutritionist).filter(
        Nutritionist.id == nutritionist_id
    ).first()

    if not nutritionist:
        raise HTTPException(404, "Nutritionist not found")

    return nutritionist

@router.post("/book")
def book_consultation(
    data: ConsultationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    nutritionist = db.query(Nutritionist).filter(
        Nutritionist.id == data.nutritionist_id
    ).first()

    if not nutritionist:
        raise HTTPException(404, "Nutritionist not found")

    if data.scheduled_time <= datetime.now(timezone.utc):
        raise HTTPException(400, "Select a future consultation time")

    consultation = Consultation(
        user_id=current_user.id,
        nutritionist_id=data.nutritionist_id,
        scheduled_time=data.scheduled_time,
        status="PENDING"
    )

    db.add(consultation)
    db.commit()
    db.refresh(consultation)

    return {
        "message": "Consultation booked successfully",
        "consultation_id": consultation.id,
        "status": consultation.status
    }

@router.get("/my/history")
def consultation_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Consultation).filter(
        Consultation.user_id == current_user.id
    ).all()

@router.patch("/cancel/{consultation_id}")
def cancel_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    consultation = db.query(Consultation).filter(
        Consultation.id == consultation_id,
        Consultation.user_id == current_user.id
    ).first()

    if not consultation:
        raise HTTPException(404, "Consultation not found")

    if consultation.status != "PENDING":
        raise HTTPException(400, "Only pending consultations can be cancelled")

    consultation.status = "CANCELLED"
    db.commit()

    return {"message": "Consultation cancelled successfully"}