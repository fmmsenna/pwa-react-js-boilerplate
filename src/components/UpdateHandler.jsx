import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => setUpdateAvailable(true);

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
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      });
    }
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
    />
  );
}

export default UpdateHandler;
