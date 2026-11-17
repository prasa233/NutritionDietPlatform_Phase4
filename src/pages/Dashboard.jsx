
import React from "react";
import {
  Users,
  Salad,
  Apple,
  CreditCard,
  TrendingUp,
  Activity
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: 1,
      description: "Registered users",
      icon: Users,
      color: "green",
      change: "Platform users"
    },
    {
      title: "Diet Plans",
      value: 3,
      description: "Available diet plans",
      icon: Salad,
      color: "blue",
      change: "Diet programs"
    },
    {
      title: "Meals Tracked",
      value: 4,
      description: "Meals recorded",
      icon: Apple,
      color: "orange",
      change: "Nutrition activity"
    },
    {
      title: "Subscriptions",
      value: 2,
      description: "Active subscriptions",
      icon: CreditCard,
      color: "purple",
      change: "Current subscribers"
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Nutrition & Diet Dashboard</h1>
          <p>Welcome to your NutriCare Management Platform.</p>
        </div>

        <div className="dashboard-date">
          <Activity size={18} />
          <span>Health Overview</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="dashboard-card" key={index}>
              <div className="dashboard-card-top">
                <div className={`stat-icon ${item.color}`}>
                  <Icon size={25} />
                </div>

                <span className="stat-menu">•••</span>
              </div>

              <div className="dashboard-card-content">
                <p className="stat-title">{item.title}</p>
                <h2 className="stat-value">{item.value}</h2>
                <p className="stat-description">
                  {item.description}
                </p>
              </div>

              <div className="stat-footer">
                <TrendingUp size={15} />
                <span>{item.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-welcome-card">
        <div>
          <span className="welcome-label">NUTRICARE OVERVIEW</span>
          <h2>Your Nutrition Journey Starts Here</h2>
          <p>
            Manage diet plans, track daily meals, monitor subscriptions,
            and maintain a healthier lifestyle with NutriCare.
          </p>
        </div>

        <div className="welcome-icon">
          <Salad size={58} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
