from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Recommendation
from app.schemas import RecommendationCreate, RecommendationResponse

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.post("/", response_model=RecommendationResponse)
def create_recommendation(
    recommendation: RecommendationCreate,
    db: Session = Depends(get_db)
):
    try:
        new_recommendation = Recommendation(
            goal_type=recommendation.goal_type,
            daily_calories=recommendation.daily_calories,
            activity_level=recommendation.activity_level
        )

        db.add(new_recommendation)
        db.commit()
        db.refresh(new_recommendation)

        return new_recommendation

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create recommendation: {str(e)}"
        )
    
@router.get("/all")
def get_all_recommendations(db: Session = Depends(get_db)):
    try:
        recommendations = db.query(Recommendation).all()

        return [
            {
                "id": item.id,
                "goal_type": item.goal_type,
                "daily_calories": item.daily_calories,
                "activity_level": item.activity_level
            }
            for item in recommendations
        ]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve recommendations: {str(e)}"
        )