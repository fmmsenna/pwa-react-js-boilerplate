import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isImmediateUpdate, setIsImmediateUpdate] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      setUpdateAvailable(true);
      setIsImmediateUpdate(event.detail.immediate);
      setRegistration(event.detail.registration);
    };

    window.addEventListener("updateAvailable", handleUpdateAvailable);

    // Check for updates when the component mounts
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CHECK_FOR_UPDATES",
        immediate: true,
      });
    }

    // Check for updates when the page becomes visible
    document.addEventListener("visibilitychange", () => {
      if (
        !document.hidden &&
        "serviceWorker" in navigator &&
        navigator.serviceWorker.controller
      ) {
        navigator.serviceWorker.controller.postMessage({
          type: "CHECK_FOR_UPDATES",
          immediate: true,
        });
      }
    });

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

  return (
    <UpdateNotification
      updateAvailable={updateAvailable}
      isImmediateUpdate={isImmediateUpdate}
      onUpdate={applyUpdate}
      onDismiss={dismissUpdate}
    />
  );
}

export default UpdateHandler;
