

import React, { useState } from "react";
import {
  Stethoscope,
  CalendarDays,
  Clock,
  Mail,
  Award,
  CheckCircle,
  ArrowRight,
  UserRound
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Rahul",
    specialization: "General Doctor",
    experience: 8,
    email: "rahul@example.com",
    status: "AVAILABLE",
    initials: "DR",
    color: "doctor-blue",
    description: "General health consultations and medical guidance."
  },
  {
    id: 2,
    name: "Dr. Ananya",
    specialization: "Clinical Nutrition",
    experience: 5,
    email: "ananya@example.com",
    status: "AVAILABLE",
    initials: "DA",
    color: "doctor-green",
    description: "Nutrition guidance and personalized dietary support."
  }
];

const Doctors = () => {
  const [appointments, setAppointments] = useState({});

  const handleBooking = (doctor) => {
    const appointment = appointments[doctor.id];

    if (!appointment?.date || !appointment?.time) {
      alert("Please select an appointment date and time.");
      return;
    }

    alert(
      `Appointment request submitted for ${doctor.name} on ${appointment.date} at ${appointment.time}.`
    );
  };

  const updateAppointment = (id, field, value) => {
    setAppointments((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  return (
    <div className="doctors-page">

      <section className="doctor-hero">
        <div>
          <span className="doctor-eyebrow">
            NUTRICARE / HEALTHCARE
          </span>

          <h1>Doctor Support</h1>

          <p>
            Connect with healthcare professionals and get expert
            guidance for your health and nutrition journey.
          </p>

          <div className="doctor-hero-info">
            <span><CheckCircle size={16} /> Professional Care</span>
            <span><CalendarDays size={16} /> Easy Booking</span>
          </div>
        </div>

        <div className="doctor-hero-icon">
          <Stethoscope size={65} />
        </div>
      </section>

      <section className="doctor-section">
        <div className="doctor-section-heading">
          <div>
            <h2>Our Available Doctors</h2>
            <p>Choose a doctor and schedule your appointment.</p>
          </div>

          <span className="doctor-count">
            {doctors.length} Doctors Available
          </span>
        </div>

        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>

              <div className="doctor-card-top">
                <div className={`doctor-avatar ${doctor.color}`}>
                  <UserRound size={35} />
                </div>

                <span className="doctor-status">
                  <span></span>
                  {doctor.status}
                </span>
              </div>

              <h3>{doctor.name}</h3>

              <span className="doctor-specialization">
                {doctor.specialization}
              </span>

              <p className="doctor-description">
                {doctor.description}
              </p>

              <div className="doctor-details">
                <div>
                  <Award size={17} />
                  <span>
                    <strong>{doctor.experience} Years</strong>
                    <small>Experience</small>
                  </span>
                </div>

                <div>
                  <Mail size={17} />
                  <span>
                    <strong>{doctor.email}</strong>
                    <small>Contact</small>
                  </span>
                </div>
              </div>

              <div className="appointment-form">
                <h4>Book an Appointment</h4>

                <label>Appointment Date</label>
                <input
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={appointments[doctor.id]?.date || ""}
                  onChange={(e) =>
                    updateAppointment(doctor.id, "date", e.target.value)
                  }
                />

                <label>Time Slot</label>
                <select
                  value={appointments[doctor.id]?.time || ""}
                  onChange={(e) =>
                    updateAppointment(doctor.id, "time", e.target.value)
                  }
                >
                  <option value="">Select Time Slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>

                <button
                  className="book-doctor-button"
                  onClick={() => handleBooking(doctor)}
                  disabled={doctor.status !== "AVAILABLE"}
                >
                  Book Appointment
                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="doctor-help-banner">
        <div className="doctor-help-icon">
          <Stethoscope size={25} />
        </div>
        <div>
          <h3>Your Health Matters</h3>
          <p>
            Consult qualified professionals for guidance on your
            healthcare and wellness needs.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Doctors;
