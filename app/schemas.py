

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime, date


class UserRegister(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    created_at: Optional[datetime] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class DietPlanCreate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    description: Optional[str] = None
    goal_type: str
    daily_calories: int = Field(gt=0)
    duration: int = Field(gt=0)


class DietPlanResponse(DietPlanCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int


class MealCreate(BaseModel):
    meal_type: str
    food_name: str
    calories: float = Field(ge=0)
    protein: float = Field(ge=0)
    carbs: float = Field(ge=0)
    fats: float = Field(ge=0)


class MealResponse(MealCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    created_at: Optional[datetime] = None


class SubscriptionCreate(BaseModel):
    name: str
    price: float = Field(ge=0)
    duration: int = Field(gt=0)
    features: str


class NutritionistCreate(BaseModel):
    name: str
    specialization: str
    experience: int = Field(ge=0)
    contact_info: str


class ConsultationCreate(BaseModel):
    nutritionist_id: int
    scheduled_time: datetime


class DoctorCreate(BaseModel):
    name: str
    specialization: str
    experience: int = Field(ge=0)
    contact_info: str
    availability_status: str = "AVAILABLE"


class AppointmentCreate(BaseModel):
    doctor_id: int
    appointment_date: date
    time_slot: str


class NotificationCreate(BaseModel):
    title: str
    message: str
class RecommendationCreate(BaseModel):
    goal_type: str = Field(..., min_length=1)
    daily_calories: int = Field(..., gt=0)
    activity_level: str = Field(..., min_length=1)


class RecommendationResponse(RecommendationCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)