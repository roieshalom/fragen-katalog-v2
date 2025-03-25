import React from "react";
import "./style.css";

export default function StatsModal({ onClose }) {
  return (
    <div className="about-modal-overlay" onClick={(e) => {
      if (e.target.classList.contains("about-modal-overlay")) {
        onClose();
      }
    }}>
      <div className="about-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h2>📊 Statistiken</h2>
        <p>Hier werden bald Statistiken zu den beantworteten Fragen angezeigt.</p>
      </div>
    </div>
  );
}
