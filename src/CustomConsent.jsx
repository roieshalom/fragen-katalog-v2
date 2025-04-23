// src/CustomConsent.jsx
import React, { useEffect, useState } from "react";

export default function CustomConsent() {
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem("user_consent") === "true";
  });

  useEffect(() => {
    if (!hasConsent) {
      // Apply default anonymous mode
      window.gtag?.("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "granted",
      });
    }
  }, [hasConsent]);

  const handleAccept = () => {
    localStorage.setItem("user_consent", "true");
    setHasConsent(true);
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
    console.log("✅ User accepted cookies");
  };

  if (hasConsent) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#222",
        color: "white",
        padding: "1rem",
        zIndex: 1100,
        textAlign: "center",
      }}
    >
      <p className="text-sm mb-2">
        Diese Website verwendet Google Analytics, um anonyme Nutzungsdaten zu sammeln. Keine persönlichen Daten werden gespeichert oder weitergegeben.
      </p>
      <button
        onClick={handleAccept}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        OK, verstanden
      </button>
    </div>
  );
}
