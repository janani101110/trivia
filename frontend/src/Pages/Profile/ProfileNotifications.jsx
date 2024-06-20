/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfileNotifications.css";
import { URL } from "../../url";

const ProfileNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${URL}/api/notifications`);
        setNotifications(res.data);
        setUnreadCount(res.data.filter(notification => !notification.read).length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-section">
      <div className="notifications-icon">
        <i className="bell-icon" />
        {unreadCount > 0 && (
          <div className="notification-count">{unreadCount}</div>
        )}
      </div>
      <div className="notifications-dropdown">
        <ul className="dropdownMenuul">
          {notifications.map((notification, index) => (
            <li key={index} className="dropdownMenuli">
              <Link to={`/notification/${notification.id}`} style={{ textDecoration: "none" }}>
                {notification.message}
              </Link>
            </li>
          ))}
          {notifications.length === 0 && (
            <li className="dropdownMenuli">No notifications</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileNotifications;*/
