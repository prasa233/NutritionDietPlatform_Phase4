

import React from "react";
import {
  Salad,
  Flame,
  CalendarDays,
  ArrowRight,
  Apple,
  Beef,
  Scale,
  HeartPulse,
  Leaf,
  CheckCircle
} from "lucide-react";

const dietPlans = [
  {
    id: 1,
    category: "MUSCLE GAIN",
    title: "Muscle Gain Diet",
    description:
      "A protein-rich nutrition plan designed to support muscle growth, strength, and recovery.",
    calories: 2500,
    duration: 30,
    icon: Beef,
    emoji: "💪",
    color: "muscle",
    tag: "High Protein",
    features: [
      "High protein meals",
      "Strength recovery support",
      "Balanced carbohydrates"
    ]
  },
  {
    id: 2,
    category: "WEIGHT LOSS",
    title: "Weight Loss Diet",
    description:
      "A balanced calorie-controlled diet to support healthy weight management and daily energy.",
    calories: 1800,
    duration: 30,
    icon: Flame,
    emoji: "🥗",
    color: "weight",
    tag: "Calorie Balanced",
    features: [
      "Portion-controlled meals",
      "Fiber-rich foods",
      "Balanced daily nutrition"
    ]
  },
  {
    id: 3,
    category: "MAINTENANCE",
    title: "Body Maintenance Diet",
    description:
      "A nutritious everyday meal plan to maintain your current weight and healthy lifestyle.",
    calories: 2200,
    duration: 30,
    icon: Scale,
    emoji: "⚖️",
    color: "maintenance",
    tag: "Balanced Nutrition",
    features: [
      "Balanced macronutrients",
      "Everyday healthy meals",
      "Sustainable food habits"
    ]
  }
];

const DietPlans = () => {
  const handleAssignPlan = (plan) => {
    alert(`${plan.title} selected successfully!`);
    // Connect your backend assignment API here.
  };

  return (
    <div className="diet-page">

      <section className="diet-hero">
        <div className="diet-hero-content">
          <span className="diet-eyebrow">
            <Leaf size={15} /> NUTRICARE / WELLNESS
          </span>

          <h1>Discover Your Diet Plan</h1>

          <p>
            Choose a nutrition plan that supports your health,
            fitness goals, and everyday lifestyle.
          </p>

          <div className="diet-hero-features">
            <div>
              <div className="hero-feature-icon green">
                <Salad size={21} />
              </div>
              <span>
                <strong>Personalized Nutrition</strong>
                <small>Plans for your goals</small>
              </span>
            </div>

            <div>
              <div className="hero-feature-icon orange">
                <Flame size={21} />
              </div>
              <span>
                <strong>Daily Calories</strong>
                <small>Track your intake</small>
              </span>
            </div>

            <div>
              <div className="hero-feature-icon blue">
                <CalendarDays size={21} />
              </div>
              <span>
                <strong>30-Day Plans</strong>
                <small>Build healthy habits</small>
              </span>
            </div>
          </div>
        </div>

        <div className="diet-hero-art">
          <div className="hero-circle">
            <span>🥑</span>
            <span>🥗</span>
            <span>🍎</span>
          </div>
        </div>
      </section>

      <section className="diet-section">
        <div className="diet-section-heading">
          <div>
            <span className="section-label">FIND YOUR HEALTHY BALANCE</span>
            <h2>Available Diet Plans</h2>
            <p>Find the right plan for your journey.</p>
          </div>

          <span className="plans-count">
            <CheckCircle size={16} />
            {dietPlans.length} Plans Available
          </span>
        </div>

        <div className="diet-grid">
          {dietPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article className={`diet-card ${plan.color}`} key={plan.id}>
                <div className="diet-card-top">
                  <div className="diet-card-icon">
                    <Icon size={28} />
                  </div>

                  <span className="diet-tag">{plan.tag}</span>
                </div>

                <span className="diet-category">{plan.category}</span>

                <h3>{plan.title}</h3>

                <p className="diet-description">
                  {plan.description}
                </p>

                <div className="diet-features">
                  {plan.features.map((feature, index) => (
                    <div key={index}>
                      <CheckCircle size={15} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="diet-stats">
                  <div className="diet-stat">
                    <Flame size={19} />
                    <span>
                      <strong>{plan.calories.toLocaleString("en-IN")}</strong>
                      <small>kcal / day</small>
                    </span>
                  </div>

                  <div className="diet-stat">
                    <CalendarDays size={19} />
                    <span>
                      <strong>{plan.duration}</strong>
                      <small>Days</small>
                    </span>
                  </div>
                </div>

                <button
                  className="assign-plan-btn"
                  onClick={() => handleAssignPlan(plan)}
                >
                  Assign Plan <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="diet-bottom-banner">
        <div className="bottom-banner-icon">
          <HeartPulse size={28} />
        </div>
        <div>
          <h3>Small Changes, Healthier Life</h3>
          <p>
            Follow a balanced diet, stay hydrated, and build healthy
            habits every day.
          </p>
        </div>
      </section>

    </div>
  );
};

export default DietPlans;
