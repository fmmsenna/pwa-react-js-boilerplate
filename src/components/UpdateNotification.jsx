import React from "react";

function UpdateNotification({ updateAvailable, onUpdate }) {
  if (!updateAvailable) return null;

  return (
    <div className="update-notification">
      <p>A new version is available. The app needs to update to continue.</p>
      <button onClick={onUpdate}>Update Now</button>
    </div>
  );
}

export default UpdateNotification;
