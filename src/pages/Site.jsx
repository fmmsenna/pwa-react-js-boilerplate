import React from "react";
import { useNavigate } from "react-router-dom";

function Site() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is a PWA template 🥳</h1>
      <button onClick={() => navigate("/welcome")}>Buy now!</button>
    </div>
  );
}

export default Site;
