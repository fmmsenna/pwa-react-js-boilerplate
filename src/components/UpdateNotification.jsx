import React from "react";

function UpdateNotification({ updateAvailable, onUpdate, onDismiss }) {
  if (!updateAvailable) return null;

  return (
    <div className="update-notification">
      <p>A new version is available!</p>
      <button onClick={onUpdate}>Update Now</button>
      <button onClick={onDismiss}>Update Later</button>
    </div>
  );
}

export default UpdateNotification;
