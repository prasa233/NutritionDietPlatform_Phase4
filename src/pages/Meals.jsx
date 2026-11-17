
import React, { useState } from "react";
import {
  Utensils,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Plus,
  Apple,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Trash2
} from "lucide-react";

const initialMeals = [
  {
    id: 1,
    food_name: "Banana and Almonds",
    meal_type: "Snacks",
    calories: 250,
    protein: 8,
    carbs: 30,
    fats: 12
  },
  {
    id: 2,
    food_name: "Chapati with Paneer Curry",
    meal_type: "Dinner",
    calories: 500,
    protein: 25,
    carbs: 55,
    fats: 15
  },
  {
    id: 3,
    food_name: "Rice, Chicken Curry and Vegetables",
    meal_type: "Lunch",
    calories: 650,
    protein: 40,
    carbs: 75,
    fats: 18
  },
  {
    id: 4,
    food_name: "Oats and Milk",
    meal_type: "Breakfast",
    calories: 350,
    protein: 15,
    carbs: 50,
    fats: 10
  }
];

const Meals = () => {
  const [meals, setMeals] = useState(initialMeals);

  const [form, setForm] = useState({
    meal_type: "Breakfast",
    food_name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });

  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + Number(meal.calories || 0),
      protein: acc.protein + Number(meal.protein || 0),
      carbs: acc.carbs + Number(meal.carbs || 0),
      fats: acc.fats + Number(meal.fats || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.food_name.trim()) {
      alert("Please enter the food name.");
      return;
    }

    const newMeal = {
      id: Date.now(),
      food_name: form.food_name.trim(),
      meal_type: form.meal_type,
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fats: Number(form.fats)
    };

    setMeals((prev) => [newMeal, ...prev]);

    setForm({
      meal_type: "Breakfast",
      food_name: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: ""
    });
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  const getMealIcon = (type) => {
    switch (type) {
      case "Breakfast":
        return <Coffee size={17} />;
      case "Lunch":
        return <Sun size={17} />;
      case "Dinner":
        return <Moon size={17} />;
      default:
        return <Cookie size={17} />;
    }
  };

  return (
    <div className="meals-page">

      <div className="meals-header">
        <div>
          <span className="meals-eyebrow">NUTRICARE / NUTRITION</span>
          <h1>Meal & Nutrition Tracking</h1>
          <p>Record your meals and keep track of your daily nutrition.</p>
        </div>

        <div className="meals-header-icon">
          <Utensils size={28} />
        </div>
      </div>

      {/* Nutrition Summary */}

      <div className="nutrition-summary">
        <div className="nutrition-card calories">
          <div className="nutrition-icon">
            <Flame size={23} />
          </div>
          <span>Total Calories</span>
          <h2>{totals.calories.toLocaleString("en-IN")}</h2>
          <small>kcal consumed</small>
        </div>

        <div className="nutrition-card protein">
          <div className="nutrition-icon">
            <Beef size={23} />
          </div>
          <span>Protein</span>
          <h2>{totals.protein} g</h2>
          <small>Total protein</small>
        </div>

        <div className="nutrition-card carbs">
          <div className="nutrition-icon">
            <Wheat size={23} />
          </div>
          <span>Carbohydrates</span>
          <h2>{totals.carbs} g</h2>
          <small>Total carbs</small>
        </div>

        <div className="nutrition-card fats">
          <div className="nutrition-icon">
            <Droplets size={23} />
          </div>
          <span>Fats</span>
          <h2>{totals.fats} g</h2>
          <small>Total fats</small>
        </div>
      </div>

      <div className="meals-layout">

        {/* Add Meal Form */}

        <section className="meal-form-card">
          <div className="meal-card-heading">
            <div className="meal-heading-icon">
              <Plus size={21} />
            </div>
            <div>
              <h2>Add a Meal</h2>
              <p>Enter your food and nutrition details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="meal-field">
              <label>Meal Type</label>
              <select
                name="meal_type"
                value={form.meal_type}
                onChange={handleChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div className="meal-field">
              <label>Food Name</label>
              <input
                type="text"
                name="food_name"
                placeholder="e.g. Oats and Milk"
                value={form.food_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="meal-field">
              <label>Calories (kcal)</label>
              <input
                type="number"
                name="calories"
                placeholder="e.g. 350"
                min="0"
                value={form.calories}
                onChange={handleChange}
                required
              />
            </div>

            <div className="meal-macro-grid">
              <div className="meal-field">
                <label>Protein (g)</label>
                <input
                  type="number"
                  name="protein"
                  placeholder="0"
                  min="0"
                  step="0.1"
                  value={form.protein}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="meal-field">
                <label>Carbs (g)</label>
                <input
                  type="number"
                  name="carbs"
                  placeholder="0"
                  min="0"
                  step="0.1"
                  value={form.carbs}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="meal-field">
                <label>Fats (g)</label>
                <input
                  type="number"
                  name="fats"
                  placeholder="0"
                  min="0"
                  step="0.1"
                  value={form.fats}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="add-meal-button">
              <Plus size={18} />
              Add Meal
            </button>
          </form>
        </section>

        {/* Meal History */}

        <section className="meal-history-card">
          <div className="meal-card-heading history-heading">
            <div>
              <h2>Meal History</h2>
              <p>Your recorded meals and nutrition details.</p>
            </div>

            <span className="meal-count">
              {meals.length} Meals
            </span>
          </div>

          {meals.length === 0 ? (
            <div className="meal-empty">
              <Apple size={40} />
              <h3>No meals recorded</h3>
              <p>Add your first meal to start tracking nutrition.</p>
            </div>
          ) : (
            <div className="meal-table-wrapper">
              <table className="meal-table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Type</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fats</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {meals.map((meal) => (
                    <tr key={meal.id}>
                      <td className="food-name">
                        <div className="food-icon">
                          {getMealIcon(meal.meal_type)}
                        </div>
                        {meal.food_name}
                      </td>

                      <td>
                        <span className={`meal-type ${meal.meal_type.toLowerCase()}`}>
                          {meal.meal_type}
                        </span>
                      </td>

                      <td className="calorie-value">
                        {meal.calories}
                      </td>

                      <td>{meal.protein} g</td>
                      <td>{meal.carbs} g</td>
                      <td>{meal.fats} g</td>

                      <td>
                        <button
                          type="button"
                          className="delete-meal-button"
                          onClick={() => deleteMeal(meal.id)}
                          aria-label={`Delete ${meal.food_name}`}
                          title="Delete meal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Meals;
