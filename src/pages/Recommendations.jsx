
import React, { useEffect, useState } from "react";
import {
  Target,
  Flame,
  Activity,
  Salad,
  Sparkles,
  RefreshCw,
  ClipboardList,
} from "lucide-react";
import api from "../services/api";

function Recommendations() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/recommendations/all");
      const data = response.data;

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data.recommendations)
        ? data.recommendations
        : Array.isArray(data.plans)
        ? data.plans
        : Array.isArray(data.items)
        ? data.items
        : [];

      setPlans(records);
    } catch (err) {
      console.error("Recommendations error:", err);
      setError(
        err.response?.data?.detail ||
        "Unable to load recommendations. Please check your backend API."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const getGoal = (goal) => {
    if (!goal) return "Personalized Goal";

    return goal.replace(/_/g, " ");
  };

  return (
    <div className="recommendations-page">
      <div className="recommendations-hero">
        <div className="recommendations-hero-icon">
          <Sparkles size={30} />
        </div>

        <div className="recommendations-hero-text">
          <span className="recommendations-eyebrow">
            YOUR PERSONAL NUTRITION GUIDE
          </span>
          <h1>Diet Recommendations</h1>
          <p>
            Personalized nutrition recommendations for your health goals.
          </p>
        </div>

        <button
          className="recommendations-refresh"
          onClick={fetchRecommendations}
          disabled={loading}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      <div className="recommendations-section-heading">
        <div>
          <h2>Recommended for You</h2>
          <p>Nutrition goals and daily activity guidance</p>
        </div>

        <span className="recommendations-total">
          {plans.length} Recommendations
        </span>
      </div>

      {loading ? (
        <div className="recommendations-message">
          <RefreshCw className="loading-icon" size={25} />
          <p>Loading your recommendations...</p>
        </div>
      ) : error ? (
        <div className="recommendations-error">
          <p>{error}</p>
          <button onClick={fetchRecommendations}>Try Again</button>
        </div>
      ) : plans.length === 0 ? (
        <div className="recommendations-empty">
          <ClipboardList size={42} />
          <h3>No Recommendations Yet</h3>
          <p>
            Your personalized diet recommendations will appear here when
            available.
          </p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {plans.map((plan, index) => (
            <div className="recommendation-card" key={plan.id ?? index}>
              <div className="recommendation-card-top">
                <div className="recommendation-icon">
                  <Salad size={25} />
                </div>

                <span className="recommendation-label">
                  <Sparkles size={13} />
                  Personalized
                </span>
              </div>

              <h3>{getGoal(plan.goal_type)}</h3>

              <p className="recommendation-description">
                Personalized diet recommendation
              </p>

              <div className="recommendation-details">
                <div className="recommendation-detail">
                  <div className="recommendation-detail-icon goal-icon">
                    <Target size={19} />
                  </div>
                  <div>
                    <span>Goal</span>
                    <strong>{getGoal(plan.goal_type)}</strong>
                  </div>
                </div>

                <div className="recommendation-detail">
                  <div className="recommendation-detail-icon calorie-icon">
                    <Flame size={19} />
                  </div>
                  <div>
                    <span>Daily Calories</span>
                    <strong>
                      {plan.daily_calories ?? "—"} kcal
                    </strong>
                  </div>
                </div>

                <div className="recommendation-detail">
                  <div className="recommendation-detail-icon activity-icon">
                    <Activity size={19} />
                  </div>
                  <div>
                    <span>Activity Level</span>
                    <strong className="activity-value">
                      {plan.activity_level ?? "Not specified"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="recommendation-footer">
                <span>
                  <CheckCircleIcon />
                  Nutrition guidance
                </span>
                <span className="recommendation-number">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <span className="recommendation-check">
      ✓
    </span>
  );
}

export default Recommendations;
