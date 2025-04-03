import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Wait for CookieYes to load
    const interval = setInterval(() => {
      const consent = window.CookieYes && window.CookieYes.consent;
      if (consent?.necessary && consent?.analytics) {
        setHasConsent(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (hasConsent) return null;

  return (
    <div className="consent-overlay">
      <div className="consent-message">
        Bitte akzeptiere die Cookies, um die Website zu nutzen.<br />
        Please accept cookies to continue.
      </div>
    </div>
  );
}
