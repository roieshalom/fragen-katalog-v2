import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = window.CookieYes?.consent;
      console.log("🔍 Checking consent:", consent); // ✅ DEBUG LOG

      if (consent?.necessary && consent?.analytics) {
        console.log("✅ CookieYes consent granted!");
        setHasConsent(true);
      }
    };

    // Initial check (in case user already accepted before)
    checkConsent();

    // Listen for future consent events
    const handleConsentUpdate = () => {
      console.log("📢 Consent update event received");
      checkConsent();
    };

    window.addEventListener("cookieyes_consent_update", handleConsentUpdate);

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
