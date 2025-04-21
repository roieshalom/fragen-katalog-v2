import React, { useEffect, useState } from "react";
import logAnalyticsEvent from "./logAnalyticsEvent";
import SupportButton from "./SupportButton";
import "./style.css";

export default function AboutModal({ onClose }) {
  const [lang, setLang] = useState("de");

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("about-modal-overlay")) {
      logAnalyticsEvent("modal_closed_without_click", { modal: "about" });
      handleClose();
    }
  };

  const switchTo = (targetLang) => {
    setLang(targetLang);
  };

  const handleClose = () => {
    logAnalyticsEvent("about_language_read", { language: lang });
    onClose();
  };

  return (
    <div className="about-modal-overlay" onClick={handleOverlayClick}>
      <div className="about-modal overflow-y-auto max-h-[90vh] flex flex-col relative pb-[180px]">
        <div className="w-full flex justify-between items-center px-4 mb-4">
          <h2 className="text-xl font-bold flex items-center gap-4">
            Über
            <span className="flex gap-2">
              <button
                onClick={() => switchTo("de")}
                style={{
                  fontSize: "18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: lang === "de" ? 1 : 0.4,
                }}
                aria-label="Deutsch"
              >
                🇩🇪
              </button>
              <button
                onClick={() => switchTo("en")}
                style={{
                  fontSize: "18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: lang === "en" ? 1 : 0.4,
                }}
                aria-label="English"
              >
                🇬🇧
              </button>
            </span>
          </h2>

          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="max-w-prose w-full px-4 text-center">
          {lang === "de" ? (
            <p className="text-base">
              <span className="text-base font-semibold">
                Diese Seite enthält alle offiziellen Fragen und Antworten für den Einbürgerungstest in Berlin.
              </span>
              <br />
              Ich habe diese Website als Lernhilfe für den Einbürgerungstest „Leben in Deutschland“ erstellt.
              Die Fragen basieren auf dem offiziellen Fragenkatalog der Bundeszentrale für politische Bildung – inklusive des
              landesspezifischen Teils für Berlin. Ich übernehme keine Gewähr für Richtigkeit oder Aktualität.
              Dies ist ein rein privates Nebenprojekt – keine Anmeldung, keine Werbung, keine Verbindung zu staatlichen Stellen.
              <br />
              Diese Website verwendet Google Analytics, um anonyme Nutzungsstatistiken zu erfassen.
              Es werden keine persönlichen Daten gespeichert oder weitergegeben.
            </p>
          ) : (
            <p className="text-base">
              <span className="text-base font-semibold">
                This site includes all official questions and answers for the Berlin naturalization test.
              </span>
              <br /><br />
              I built this website as a personal study tool for the “Leben in Deutschland” naturalization test.
              The questions are based on the official public catalog — including the state-specific questions for Berlin.
              Some states have different regional questions. I can’t guarantee accuracy or updates.
              This is a private side project — no login, no ads, no government affiliation.
              <br /><br />
              This site uses Google Analytics to collect anonymous usage data.
              No personal data is stored or shared.
            </p>
          )}
        </div>

        {/* Bottom-fixed buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            gap: "30px",
          }}
        >
          <a
            href="mailto:fragen@fragen-katalog.com"
            className="text-base text-center"
            style={{
              textDecoration: "underline",
              color: "var(--color-primary)",
              fontWeight: 500,
            }}
          >
            fragen@fragen-katalog.com
          </a>

          <SupportButton fullWidth variant="modal" style={{ whiteSpace: "nowrap" }} />
        </div>
      </div>
    </div>
  );
}
