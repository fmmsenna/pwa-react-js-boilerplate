import React, { useState, useEffect } from "react";
import UpdateNotification from "./UpdateNotification";

function UpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      if (event.data && event.data.type === "UPDATE_AVAILABLE") {
        setUpdateAvailable(true);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleUpdateAvailable);

    // Check for updates when the component mounts
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CHECK_FOR_UPDATES",
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
        });
      }
    });

    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleUpdateAvailable
      );
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
