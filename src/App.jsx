
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DietPlans from "./pages/DietPlans";
import Meals from "./pages/Meals";
import Subscriptions from "./pages/Subscriptions";
import Nutritionists from "./pages/Nutritionists";
import Recommendations from "./pages/Recommendations";
import Notifications from "./pages/Notifications";
import Doctors from "./pages/Doctors";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/diet-plans" element={<Layout><DietPlans /></Layout>} />
        <Route path="/meals" element={<Layout><Meals /></Layout>} />
        <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
        <Route path="/nutritionists" element={<Layout><Nutritionists /></Layout>} />
        <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
