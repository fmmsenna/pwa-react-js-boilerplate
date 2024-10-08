import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => navigate("/")}>Go back!</button>
    </div>
  );
}

export default Welcome;
