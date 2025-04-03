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
        🇩🇪 Ich habe diese Seite als Lernhilfe gebaut – kostenlos, ohne Werbung oder Anmeldung.
Damit ich besser verstehen kann, wie die Seite genutzt wird, verwende ich Cookies für anonyme Statistikdaten.
Bitte akzeptiere die Nutzung von Cookies, um fortzufahren.
        Bitte akzeptiere die Nutzung von Cookies, um fortzufahren.
        </p>
        <p>
       🇬🇧 I built this site as a free learning project — no ads, no login, just for fun.
To improve it, I use cookies for anonymous analytics.
Please accept cookies to continue.
        </p>
        <button className="consent-button" onClick={handleAccept}>
          Einverstanden / Accept
        </button>
      </div>
    </div>
  );
}
