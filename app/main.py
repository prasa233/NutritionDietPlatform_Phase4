
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routers import dashboard
from app.routers import (
    auth,
    diet_plans,
    meals,
    subscriptions,
    nutritionists,
    recommendations,
    notifications,
    doctors
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nutrition & Diet Management Platform",
    description="Phase 4 - Complete Nutrition and Healthcare System",
    version="4.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(diet_plans.router)
app.include_router(meals.router)
app.include_router(subscriptions.router)
app.include_router(nutritionists.router)
app.include_router(recommendations.router)
app.include_router(notifications.router)
app.include_router(doctors.router)
app.include_router(dashboard.router)

@app.get("/")
def home():
    return {
        "project": "Nutrition & Diet Management Platform",
        "version": "4.0.0",
        "status": "Running",
        "modules": 8
    }

@app.get("/health")
def health():
    return {"status": "healthy"}