# Nutrition & Diet Management Platform – Phase 4

## Project Overview
A full-stack web application that enables users to manage diet plans, track daily nutrition, subscribe to premium services, and connect with nutritionists and doctors.

**Project Phase:** Phase 4

## Technology Stack
- **Backend:** Python, FastAPI, SQLAlchemy, Pydantic, JWT, Bcrypt
- **Frontend:** React.js, JavaScript, HTML, CSS, Axios
- **Database:** SQLite / PostgreSQL

## Project Modules

1. **User Authentication** – Registration, login, JWT authentication, and protected routes.
2. **Diet Plans Management** – Create, view, assign, and manage personalized diet plans.
3. **Meal & Nutrition Tracking** – Track daily meals, calories, protein, carbohydrates, and fats.
4. **Subscription Management** – Free, Premium, and Pro plans with upgrade and downgrade options.
5. **Nutritionist Consultation** – View nutritionists and book consultations.
6. **Diet Recommendations** – Personalized diet suggestions based on goals, calories, and activity levels.
7. **Notifications & Reminders** – Meal reminders, subscription alerts, and consultation notifications.
8. **Doctor Support** – Doctor profiles, appointment booking, and consultation history.

## Database Tables
- Users
- Diet_Plans
- Meals
- Subscriptions
- User_Subscriptions
- Nutritionists
- Consultations
- Doctors
- Appointments
- Notifications

## Project Structure
```text
Nutrition-Diet-Management/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── core/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Installation & Setup

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Application URLs
- Backend: http://127.0.0.1:8000
- Swagger Docs: http://127.0.0.1:8000/docs
- Frontend: http://localhost:5173

## Security Features
- JWT authentication
- Bcrypt password hashing
- Protected API endpoints
- User ownership validation
- Pydantic input validation
- Secure environment configuration

## Future Enhancements
- Online payment integration
- Advanced AI diet recommendations
- Video consultations
- Email and SMS notifications
- Mobile application support

## Conclusion
This project provides an integrated nutrition and healthcare management platform using FastAPI and React, demonstrating full-stack development, authentication, subscription management, and personalized healthcare features.

**Project Status:** Phase 4 – Nutrition & Diet Management Platform
