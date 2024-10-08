import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      setUpdateAvailable(true);
      setRegistration(event.detail);
    };

    window.addEventListener("updateAvailable", handleUpdateAvailable);

    // Check for updates when the component mounts
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CHECK_FOR_UPDATES",
      });
    }

    return () => {
      window.removeEventListener("updateAvailable", handleUpdateAvailable);
    };
  }, []);

  const applyUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
  };

  useEffect(() => {
    const handleControllerChange = () => {
      window.location.reload();
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        handleControllerChange
      );
    }

    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          handleControllerChange
        );
      }
    };
  }, []);

  return (
    <UpdateNotification
      updateAvailable={updateAvailable}
      onUpdate={applyUpdate}
      onDismiss={dismissUpdate}
    />
  );
}

export default UpdateHandler;
