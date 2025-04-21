// src/FloatingSupportButton.jsx
import React from "react";
import logAnalyticsEvent from "./logAnalyticsEvent";

function FloatingSupportButton() {
  const handleClick = () => {
    logAnalyticsEvent("support_this_project_clicked");
    window.open("https://www.buymeacoffee.com/roiesh", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="floating-support-button"
    >
      Support this project ❤️
    </button>
  );
}

export default FloatingSupportButton;

