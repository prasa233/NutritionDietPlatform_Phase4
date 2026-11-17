
from sqlalchemy import (
    Column, Integer, String, Float, Boolean,
    DateTime, Date, ForeignKey, Text, UniqueConstraint
)
from datetime import datetime, timezone

from app.database import Base


def utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class DietPlan(Base):
    __tablename__ = "diet_plans"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text)
    goal_type = Column(String(50), nullable=False)
    daily_calories = Column(Integer, nullable=False)
    duration = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class UserDietPlan(Base):
    __tablename__ = "user_diet_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    diet_plan_id = Column(Integer, ForeignKey("diet_plans.id"), nullable=False)
    assigned_at = Column(DateTime(timezone=True), default=utc_now)


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    meal_type = Column(String(30), nullable=False)
    food_name = Column(String(150), nullable=False)
    calories = Column(Float, default=0)
    protein = Column(Float, default=0)
    carbs = Column(Float, default=0)
    fats = Column(Float, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    price = Column(Float, default=0)
    duration = Column(Integer, nullable=False)
    features = Column(Text)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class UserSubscription(Base):
    __tablename__ = "user_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subscription_id = Column(
        Integer, ForeignKey("subscriptions.id"), nullable=False
    )
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)


class Nutritionist(Base):
    __tablename__ = "nutritionists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialization = Column(String(150))
    experience = Column(Integer, default=0)
    contact_info = Column(String(200))


class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    nutritionist_id = Column(
        Integer, ForeignKey("nutritionists.id"), nullable=False
    )
    scheduled_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(String(30), default="PENDING")
    created_at = Column(DateTime(timezone=True), default=utc_now)


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialization = Column(String(100))
    experience = Column(Integer, default=0)
    contact_info = Column(String(200))
    availability_status = Column(String(30), default="AVAILABLE")
    created_at = Column(DateTime(timezone=True), default=utc_now)


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    appointment_date = Column(Date, nullable=False)
    time_slot = Column(String(50), nullable=False)
    status = Column(String(30), default="PENDING")
    created_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        UniqueConstraint(
            "doctor_id", "appointment_date", "time_slot",
            name="unique_doctor_appointment_slot"
        ),
    )


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)
class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    goal_type = Column(String, nullable=False)
    daily_calories = Column(Integer, nullable=False)
    activity_level = Column(String, nullable=False)