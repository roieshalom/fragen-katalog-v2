import { useState, useEffect } from "react";
import "./CustomConsent.css";

export default function CustomConsent({ onConsentGiven }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("consentGiven");
    if (!hasAccepted) {
      setShowOverlay(true);
    } else {
      onConsentGiven();
    }
  }, [onConsentGiven]);

  const handleAccept = () => {
    localStorage.setItem("consentGiven", "true");
    setShowOverlay(false);
    onConsentGiven();
  };

  if (!showOverlay) return null;

  return (
    <div className="consent-backdrop">
      <div className="consent-modal">
        <h2>Willkommen bei Fragen-Katalog!</h2>
        <p>
          Ich habe dieses Projekt als Lernhilfe für mich (und vielleicht auch für dich?) gebaut –
          es ist komplett kostenlos, ohne Werbung oder Anmeldung.
        </p>
        <p>
          Um die Seite weiterzuentwickeln, verwende ich anonyme Statistikdaten. Bitte akzeptiere
          die Nutzung von Cookies, damit ich besser verstehen kann, was funktioniert.
        </p>
        <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          I built this as a personal learning project – completely free, ad-free, no login. I'd be
          grateful if you accept cookies to help me understand how it's used.
        </p>
        <button className="consent-button" onClick={handleAccept}>
          Einverstanden / Accept
        </button>
      </div>
    </div>
  );
}
