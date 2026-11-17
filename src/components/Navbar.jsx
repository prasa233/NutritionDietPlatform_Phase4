

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  ["🏠", "Dashboard", "/dashboard"],
  ["🥗", "Diet Plans", "/diet-plans"],
  ["🍎", "Meals", "/meals"],
  ["💳", "Subscriptions", "/subscriptions"],
  ["👩‍⚕️", "Nutritionists", "/nutritionists"],
  ["💡", "Recommendations", "/recommendations"],
  ["🔔", "Notifications", "/notifications"],
  ["🩺", "Doctors", "/doctors"],
];

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="navbar">
      <div className="navbar-top">
        <div className="brand">
          🌿 NutriCare
          <small>Nutrition & Wellness</small>
        </div>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
      >
        ☰ Menu
      </button>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        {links.map(([icon, label, path]) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="logout-button" onClick={logout}>
        ↪ Logout
      </button>
    </aside>
  );
}

export default Navbar;
