from pydantic import BaseModel, Field
from typing import Optional


class RecommendationCreate(BaseModel):
    goal_type: str = Field(..., min_length=1)
    daily_calories: int = Field(..., gt=0)
    activity_level: str = Field(..., min_length=1)


class RecommendationResponse(RecommendationCreate):
    id: int

    class Config:
        from_attributes = True