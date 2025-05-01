// src/CustomConsent.jsx
import React, { useEffect, useState } from "react";

export default function CustomConsent() {
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem("user_consent") === "true";
  });

  useEffect(() => {
    if (!hasConsent) {
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
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)", // ✅ see-through background
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "white", // ✅ white card
          color: "#222",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "360px",
          textAlign: "center",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ marginBottom: "16px", fontSize: "15px", lineHeight: 1.5 }}>
          Diese Website verwendet Google Analytics, um anonyme Nutzungsdaten zu sammeln.
          Keine persönlichen Daten werden gespeichert oder weitergegeben.
        </p>
        <button
          onClick={handleAccept}
          style={{
            fontSize: "15px",
            padding: "10px 16px",
            fontWeight: "500",
            backgroundColor: "var(--color-primary)", // ✅ match your blue
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          OK, verstanden
        </button>
      </div>
    </div>
  );
}
