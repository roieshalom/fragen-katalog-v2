import React, { useEffect } from "react";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import "./style.css";

export default function AboutModal({ onClose }) {
  useEffect(() => {
    logEvent(analytics, "about_modal_opened");
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("about-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="about-modal-overlay" onClick={handleOverlayClick}>
      <div className="about-modal overflow-y-auto max-h-[90vh] flex flex-col items-center">
        <button className="close-button self-end" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Über</h2>

        <div className="max-w-prose w-full px-4 text-center">
          <p className="text-base mb-3">
            🇩🇪 Ich habe diese Website als Lernhilfe für den Einbürgerungstest „Leben in Deutschland“ gebaut.
            Die Inhalte basieren auf dem offiziellen Fragenkatalog der Bundeszentrale für politische Bildung,
            jedoch ohne Garantie für Richtigkeit oder Aktualität.
            Es handelt sich um ein privates Nebenprojekt – keine Anmeldung, keine Werbung, keine Verbindung zu staatlichen Stellen.
          </p>

          <p className="text-base mb-3">
            🇬🇧 I built this website as a personal study tool for the "Leben in Deutschland" naturalization test.
            The content is based on the official public catalog, but I can’t guarantee accuracy or updates.
            This is a private side project — no login, no ads, no government affiliation.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "70px", marginTop: "0.5rem" }}>
  <a
    href="mailto:fragen@fragen-katalog.com"
    className="text-base text-center"
    style={{ textDecoration: "underline", color: "var(--color-primary)", fontWeight: 500 }}
  >
    fragen@fragen-katalog.com
  </a>

  <button
  onClick={() => window.open("https://www.buymeacoffee.com/roiesh", "_blank")}
  className="controls-button"
  style={{ width: "100%", maxWidth: "200px", textAlign: "center" }}
>
  Buy me a coffee
</button>
</div>
      </div>
    </div>
  );
}
