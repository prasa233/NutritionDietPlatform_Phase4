
import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Mail,
  Award,
  UserRound,
  Stethoscope,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const nutritionists = [
  {
    id: 1,
    name: "Dr. Ananya",
    specialization: "Clinical Nutrition",
    experience: 5,
    email: "ananya@example.com",
    initials: "AN",
    color: "green",
    description: "Personalized nutrition guidance and healthy eating plans.",
  },
  {
    id: 2,
    name: "Dr. Rahul Sharma",
    specialization: "Sports Nutrition",
    experience: 7,
    email: "rahul@example.com",
    initials: "RS",
    color: "blue",
    description: "Sports performance, fitness nutrition and muscle development.",
  },
  {
    id: 3,
    name: "Dr. Priya Reddy",
    specialization: "Pediatric Nutrition",
    experience: 4,
    email: "priya@example.com",
    initials: "PR",
    color: "purple",
    description: "Nutrition guidance for children's growth and development.",
  },
  {
    id: 4,
    name: "Dr. Kiran Kumar",
    specialization: "Weight Management",
    experience: 5,
    email: "kiran@example.com",
    initials: "KK",
    color: "orange",
    description: "Balanced diet strategies for healthy weight management.",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function Nutritionists() {
  const [appointments, setAppointments] = useState({});
  const [bookingMessage, setBookingMessage] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (id, field, value) => {
    setAppointments((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        [field]: value,
      },
    }));
  };

  const handleBooking = (doctor) => {
    const appointment = appointments[doctor.id] || {};

    if (!appointment.date || !appointment.time) {
      setBookingMessage(
        `Please select a consultation date and time for ${doctor.name}.`
      );
      return;
    }

    setBookingMessage(
      `Consultation details selected for ${doctor.name}: ${appointment.date} at ${appointment.time}.`
    );
  };

  return (
    <div className="nutritionists-page">
      <section className="nutritionists-hero">
        <div className="nutritionists-hero-icon">
          <Stethoscope size={30} />
        </div>

        <div className="nutritionists-hero-content">
          <span className="nutritionists-eyebrow">
            EXPERT NUTRITION SUPPORT
          </span>
          <h1>Nutritionist Consultation</h1>
          <p>
            Connect with nutrition experts and get personalized guidance
            for your health and fitness goals.
          </p>
        </div>

        <div className="nutritionists-hero-badge">
          <Sparkles size={16} />
          Expert Guidance
        </div>
      </section>

      <div className="nutritionists-heading">
        <div>
          <h2>Meet Our Nutritionists</h2>
          <p>Choose an expert and schedule your consultation.</p>
        </div>
        <span>{nutritionists.length} Experts Available</span>
      </div>

      {bookingMessage && (
        <div className="nutritionist-booking-message">
          {bookingMessage}
          <button onClick={() => setBookingMessage("")}>×</button>
        </div>
      )}

      <div className="nutritionists-grid">
        {nutritionists.map((doctor) => {
          const appointment = appointments[doctor.id] || {};

          return (
            <div className="nutritionist-card" key={doctor.id}>
              <div className="nutritionist-card-header">
                <div className={`nutritionist-avatar ${doctor.color}`}>
                  {doctor.initials}
                </div>

                <span className="nutritionist-available">
                  <span></span>
                  Available
                </span>
              </div>

              <h3>{doctor.name}</h3>

              <p className="nutritionist-description">
                {doctor.description}
              </p>

              <div className="nutritionist-specialization">
                <Stethoscope size={17} />
                <div>
                  <span>Specialization</span>
                  <strong>{doctor.specialization}</strong>
                </div>
              </div>

              <div className="nutritionist-info-row">
                <Award size={18} />
                <span>
                  Experience: <strong>{doctor.experience} years</strong>
                </span>
              </div>

              <div className="nutritionist-info-row">
                <Mail size={18} />
                <span>{doctor.email}</span>
              </div>

              <div className="nutritionist-divider"></div>

              <div className="consultation-form-heading">
                <CalendarDays size={18} />
                <h4>Select consultation date and time</h4>
              </div>

              <label className="consultation-label">
                Consultation Date
              </label>

              <input
                type="date"
                min={minDate}
                value={appointment.date || ""}
                onChange={(e) =>
                  handleChange(doctor.id, "date", e.target.value)
                }
                className="consultation-input"
              />

              <label className="consultation-label">
                Consultation Time
              </label>

              <div className="consultation-time-wrapper">
                <Clock size={17} />
                <select
                  value={appointment.time || ""}
                  onChange={(e) =>
                    handleChange(doctor.id, "time", e.target.value)
                  }
                  className="consultation-input"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="book-consultation-btn"
                onClick={() => handleBooking(doctor)}
              >
                <CalendarDays size={17} />
                Book Consultation
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Nutritionists;
