import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setUpdateAvailable(true);
    };

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "UPDATE_AVAILABLE") {
        handleUpdateAvailable();
      }
    });

    // Check for updates when the component mounts or the page becomes visible
    const checkForUpdates = () => {
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "CHECK_FOR_UPDATES",
        });
      }
    };

    checkForUpdates();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    });

    return () => {
      document.removeEventListener("visibilitychange", checkForUpdates);
    };
  }, []);

  const applyUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
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
