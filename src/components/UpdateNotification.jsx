import React from "react";
import "../styles/UpdateNotification.css";

function UpdateNotification({ updateAvailable, onUpdate }) {
  if (!updateAvailable) return null;

  return (
    <div className="update-notification-overlay">
      <div className="update-notification-content">
        <h2>Update Available</h2>
        <p>A new version of the app is ready. Please update to continue.</p>
        <button onClick={onUpdate} className="update-button">
          Update Now
        </button>
      </div>
    </div>
  );
}

export default UpdateNotification;
