
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.database import get_db
from app.models import Doctor, Appointment, User
from app.schemas import DoctorCreate, AppointmentCreate
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/doctors",
    tags=["Doctor Support"]
)

@router.post("/")
def create_doctor(
    data: DoctorCreate,
    db: Session = Depends(get_db)
):
    doctor = Doctor(**data.model_dump())

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor added successfully",
        "doctor_id": doctor.id
    }

@router.get("/")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

@router.get("/{doctor_id}")
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(
        Doctor.id == doctor_id
    ).first()

    if not doctor:
        raise HTTPException(404, "Doctor not found")

    return doctor

@router.post("/appointments/book")
def book_appointment(
    data: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    doctor = db.query(Doctor).filter(
        Doctor.id == data.doctor_id
    ).first()

    if not doctor:
        raise HTTPException(404, "Doctor not found")

    if doctor.availability_status != "AVAILABLE":
        raise HTTPException(400, "Doctor is unavailable")

    if data.appointment_date < date.today():
        raise HTTPException(400, "Appointment date cannot be in the past")

    existing = db.query(Appointment).filter(
        Appointment.doctor_id == data.doctor_id,
        Appointment.appointment_date == data.appointment_date,
        Appointment.time_slot == data.time_slot,
        Appointment.status.in_(["PENDING", "CONFIRMED"])
    ).first()

    if existing:
        raise HTTPException(409, "Time slot already booked")

    appointment = Appointment(
        user_id=current_user.id,
        doctor_id=data.doctor_id,
        appointment_date=data.appointment_date,
        time_slot=data.time_slot,
        status="PENDING"
    )

    db.add(appointment)

    try:
        db.commit()
        db.refresh(appointment)
    except Exception:
        db.rollback()
        raise HTTPException(409, "Appointment slot is unavailable")

    return {
        "message": "Appointment booked successfully",
        "appointment_id": appointment.id,
        "status": appointment.status
    }

@router.get("/appointments/my-history")
def my_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Appointment).filter(
        Appointment.user_id == current_user.id
    ).all()

@router.patch("/appointments/{appointment_id}/cancel")
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == current_user.id
    ).first()

    if not appointment:
        raise HTTPException(404, "Appointment not found")

    if appointment.status not in ["PENDING", "CONFIRMED"]:
        raise HTTPException(400, "Appointment cannot be cancelled")

    appointment.status = "CANCELLED"
    db.commit()

    return {"message": "Appointment cancelled successfully"}