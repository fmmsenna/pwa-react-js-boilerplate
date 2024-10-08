import React from "react";

function UpdateNotification({ updateAvailable, updatePrecached, onUpdate }) {
  if (!updateAvailable || !updatePrecached) return null;

  return (
    <div className="update-notification">
      <p>A new version is available and ready to install!</p>
      <button onClick={onUpdate}>Update Now</button>
    </div>
  );
}

export default UpdateNotification;
