
import React, { useState } from "react";
import {
  Bell,
  Utensils,
  ClipboardCheck,
  CheckCircle,
  Trash2,
  BellRing,
  CheckCheck,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Meal Reminder",
    message:
      "It's time for lunch. Don't forget to follow your healthy meal schedule.",
    type: "meal",
    read: false,
    time: "Today",
  },
  {
    id: 2,
    title: "Diet Plan Updated",
    message:
      "Your diet plan has been updated successfully. Check your dashboard to view your new meal schedule.",
    type: "diet",
    read: false,
    time: "Today",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <div className="notifications-page">
      <div className="notifications-hero">
        <div className="notifications-hero-content">
          <div className="notification-hero-icon">
            <BellRing size={28} />
          </div>
          <div>
            <h1>Notifications & Reminders</h1>
            <p>
              Stay updated with your meals, diet plans, and nutrition activities.
            </p>
          </div>
        </div>

        <div className="notification-count">
          <span>{unreadCount}</span>
          <small>Unread notifications</small>
        </div>
      </div>

      <div className="notifications-toolbar">
        <div>
          <h2>Your Notifications</h2>
          <p>You have {notifications.length} notifications.</p>
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              className={`notification-card ${item.read ? "is-read" : "is-unread"}`}
              key={item.id}
            >
              <div className={`notification-icon ${item.type}`}>
                {item.type === "meal" ? (
                  <Utensils size={23} />
                ) : (
                  <ClipboardCheck size={23} />
                )}
              </div>

              <div className="notification-content">
                <div className="notification-title-row">
                  <h3>{item.title}</h3>

                  <span className={`notification-status ${item.read ? "read" : "unread"}`}>
                    {item.read ? (
                      <>
                        <CheckCircle size={13} /> Read
                      </>
                    ) : (
                      <>
                        <span className="unread-dot"></span> Unread
                      </>
                    )}
                  </span>
                </div>

                <p>{item.message}</p>

                <span className="notification-time">{item.time}</span>

                <div className="notification-actions">
                  {!item.read && (
                    <button
                      className="mark-read-btn"
                      onClick={() => markAsRead(item.id)}
                    >
                      <CheckCircle size={16} />
                      Mark Read
                    </button>
                  )}

                  <button
                    className="delete-notification-btn"
                    onClick={() => deleteNotification(item.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <div className="empty-notification-icon">
              <Bell size={35} />
            </div>
            <h3>All caught up!</h3>
            <p>You don't have any notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
