import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Wait up to 5 seconds, then allow access
    const timer = setTimeout(() => {
      console.log("⏳ No event fired, removing blocker after timeout");
      setHasConsent(true);
    }, 5000);

    return () => clearTimeout(timer);
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
