import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Show overlay initially
    setHasConsent(false);

    // Listen for consent event
    const handleConsentUpdate = () => {
      console.log("📢 Consent event received — removing blocker");
      setHasConsent(true);
    };

    // Register event
    window.addEventListener("cookieyes_consent_update", handleConsentUpdate);

    // Clean up
    return () => {
      window.removeEventListener("cookieyes_consent_update", handleConsentUpdate);
    };
  }, []);

  if (hasConsent) return null;

  return (
    <div className="consent-overlay">
      <div className="consent-message">
        Bitte akzeptiere die Cookies, um die Website zu nutzen.
        <br />
        Please accept cookies to continue.
      </div>
    </div>
  );
}
 