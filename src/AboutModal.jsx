import React from "react";
import "./style.css";

export default function AboutModal({ onClose }) {
  return (
    <div className="about-modal-overlay">
      <div className="about-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>About / Über</h2>
        <p>
          This private and personal webapp is under construction. The content is
          unreliable, misleading, partial and harmful. I strongly recommend you
          not to use it in any way. Any usage you make is at your own risk!
        </p>
        <p>
          Die Nutzung dieser privaten Webanwendung erfolgt auf eigene Gefahr. Der
          Inhalt ist unzuverlässig, irreführend, unvollständig und möglicherweise
          schädlich. Ich empfehle dringend, diese Anwendung nicht zu verwenden.
        </p>
        <p>
          The questions were taken from:
          <br />
          <a
            href="https://www.lebenindeutschland.eu/fragenkatalog/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.lebenindeutschland.eu/fragenkatalog/1
          </a>
        </p>
      </div>
    </div>
  );
}
