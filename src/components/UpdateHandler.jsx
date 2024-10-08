import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updatePrecached, setUpdatePrecached] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => setUpdateAvailable(true);
    const handleUpdatePrecached = (event) => {
      if (event.data && event.data.type === "UPDATE_PRECACHED") {
        setUpdatePrecached(true);
      }
    };

    window.addEventListener("updateAvailable", handleUpdateAvailable);
    navigator.serviceWorker.addEventListener("message", handleUpdatePrecached);

    return () => {
      window.removeEventListener("updateAvailable", handleUpdateAvailable);
      navigator.serviceWorker.removeEventListener(
        "message",
        handleUpdatePrecached
      );
    };
  }, []);

  const applyUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting.postMessage({ type: "APPLY_UPDATE" });
      });
    }
  };

  return (
    <UpdateNotification
      updateAvailable={updateAvailable}
      updatePrecached={updatePrecached}
      onUpdate={applyUpdate}
    />
  );
}

export default UpdateHandler;
