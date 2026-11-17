

import React, { useState } from "react";
import {
  CreditCard,
  Crown,
  CheckCircle,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Premium",
    price: 499,
    duration: 30,
    description: "Personalized diet plans and expert consultation.",
    features: [
      "Personalized diet plans",
      "Expert nutritionist consultation",
      "Daily nutrition tracking",
      "Diet recommendations",
    ],
    color: "premium",
  },
  {
    id: 2,
    name: "Gold",
    price: 1099,
    duration: 30,
    description: "Advanced nutrition support for your health journey.",
    features: [
      "Everything in Premium",
      "Advanced personalized diet plans",
      "Priority expert consultation",
      "Advanced nutrition guidance",
    ],
    color: "gold",
  },
];

function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);

    alert(
      `${plan.name} plan selected.\n\nPayment is currently in demo mode. No real payment has been collected.`
    );
  };

  return (
    <div className="subscriptions-page">
      <section className="subscription-hero">
        <div className="subscription-hero-icon">
          <Crown size={30} />
        </div>

        <div className="subscription-hero-content">
          <span className="subscription-eyebrow">
            NUTRICARE MEMBERSHIP
          </span>
          <h1>Subscription Plans</h1>
          <p>
            Choose the right nutrition membership to support your health goals.
          </p>
        </div>
      </section>

      <section className="current-subscription">
        <div className="current-subscription-heading">
          <div className="current-plan-icon">
            <CreditCard size={24} />
          </div>

          <div>
            <h2>My Current Subscription</h2>
            <p>Your active NutriCare membership</p>
          </div>

          <span className="active-subscription-badge">
            <CheckCircle size={14} />
            Active
          </span>
        </div>

        <div className="current-subscription-details">
          <div>
            <span>Plan</span>
            <strong>Active plan</strong>
          </div>

          <div>
            <span>Price</span>
            <strong>₹499</strong>
          </div>

          <div>
            <span>End Date</span>
            <strong>17 December 2026</strong>
          </div>
        </div>
      </section>

      <section className="subscription-plans-section">
        <div className="subscription-section-heading">
          <div>
            <h2>Choose Your Plan</h2>
            <p>Unlock personalized nutrition services.</p>
          </div>
          <span>30-day membership</span>
        </div>

        <div className="subscription-plans-grid">
          {plans.map((plan) => (
            <div
              className={`subscription-plan-card ${plan.color}`}
              key={plan.id}
            >
              <div className="subscription-plan-top">
                <div className="subscription-plan-icon">
                  {plan.name === "Premium" ? (
                    <Star size={25} />
                  ) : (
                    <Crown size={25} />
                  )}
                </div>

                {plan.name === "Gold" && (
                  <span className="popular-plan-badge">
                    <Sparkles size={13} />
                    Premium Choice
                  </span>
                )}
              </div>

              <h3>{plan.name}</h3>
              <p className="subscription-plan-description">
                {plan.description}
              </p>

              <div className="subscription-price">
                <span>₹</span>
                <strong>{plan.price.toLocaleString("en-IN")}</strong>
                <small>/ 30 days</small>
              </div>

              <div className="subscription-duration">
                <CalendarDays size={16} />
                Duration: {plan.duration} days
              </div>

              <div className="subscription-feature-list">
                {plan.features.map((feature) => (
                  <div className="subscription-feature" key={feature}>
                    <CheckCircle size={17} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="choose-subscription-btn"
                onClick={() => handleChoosePlan(plan)}
              >
                <Zap size={17} />
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="subscription-demo-warning">
        <ShieldCheck size={23} />
        <div>
          <strong>Demo Payment Mode</strong>
          <p>
            Subscription activation is currently in demo mode. A verified
            payment gateway must be integrated before accepting real payments.
            No real payment will be collected through these buttons.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
