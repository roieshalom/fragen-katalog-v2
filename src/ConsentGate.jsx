import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = window.CookieYes?.consent;
      console.log("🔍 Checking consent:", consent);
      if (consent?.necessary && consent?.analytics) {
        console.log("✅ CookieYes consent granted!");
        setHasConsent(true);
        return true;
      }
      return false;
    };

    // Initial check
    if (checkConsent()) return;

    // Listen for consent update
    const handleConsentUpdate = () => {
      console.log("📢 Consent update event received");
      // Delay check slightly in case data isn't ready
      setTimeout(() => checkConsent(), 500);
    };

    window.addEventListener("cookieyes_consent_update", handleConsentUpdate);

    // Fallback polling – give it 5s max
    let tries = 0;
    const interval = setInterval(() => {
      if (checkConsent() || tries > 10) {
        clearInterval(interval);
      }
      tries++;
    }, 500);

    return () => {
      window.removeEventListener("cookieyes_consent_update", handleConsentUpdate);
      clearInterval(interval);
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
