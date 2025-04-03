import { useEffect, useState } from "react";
import "./ConsentGate.css";

export default function ConsentGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    console.log("🔒 ConsentGate mounted, waiting 5 seconds…");

    const timer = setTimeout(() => {
      console.log("✅ Removing overlay after timeout");
      setHasConsent(true);
    }, 5000); // Show overlay for 5 seconds max

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
