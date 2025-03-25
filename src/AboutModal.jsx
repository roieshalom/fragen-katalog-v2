import React, { useEffect, useState, useRef } from "react";
import { db, analytics } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { Player } from "@lottiefiles/react-lottie-player";
import confettiAnimation from "./animations/confetti.json";
import "./style.css";

export default function AboutModal({ onClose }) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const isSubmitting = useRef(false); // prevent double fire

  const IS_ME = false; // Set to false before going live!

  useEffect(() => {
    const hasClicked = localStorage.getItem("hiFiveClicked");

    if (hasClicked && !IS_ME) {
      setClicked(true);
    }

    const fetchCount = async () => {
      const ref = doc(db, "global", "hiFive");
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setCount(snapshot.data().count || 0);
      } else {
        await setDoc(ref, { count: 0 });
      }
    };

    fetchCount();
    logEvent(analytics, "about_modal_opened", { userType: IS_ME ? "dev" : "guest" });
  }, []);

  const handleHiFive = async () => {
    const alreadyClicked = localStorage.getItem("hiFiveClicked");

    // 🔒 Real users: block if already clicked
    if (alreadyClicked && !IS_ME) return;

    // 👇 Set clicked visually + persist (but only once for real users)
    setClicked(true);
    if (!alreadyClicked && !IS_ME) {
      localStorage.setItem("hiFiveClicked", "true");

      // 🔄 Update Firestore count
      const ref = doc(db, "global", "hiFive");
      await updateDoc(ref, { count: count + 1 });
      setCount((prev) => prev + 1);
    }

    // 🎉 Only allow animation if:
    // - you're the dev (IS_ME), or
    // - it's the user's first click
    const allowAnimation = IS_ME || !alreadyClicked;
    if (allowAnimation) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }

    logEvent(analytics, "hi_five_clicked", { userType: IS_ME ? "dev" : "guest" });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("about-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="about-modal-overlay" onClick={handleOverlayClick}>
      <div className="about-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <p><strong>DE</strong><br />
        Die Nutzung dieser privaten Webanwendung erfolgt auf eigene Gefahr. Der Inhalt ist unzuverlässig, irreführend, unvollständig und möglicherweise schädlich. Ich empfehle dringend, diese Anwendung nicht zu verwenden.</p>

        <p><strong>EN</strong><br />
        This private and personal webapp is under construction. The content is unreliable, misleading, partial and harmful. I strongly recommend you not to use it in any way. Any usage you make is at your own risk!</p>

        <p><strong>YI</strong><br />
        <span className="yiddish-block">דער פּריוואַט און פּערזענלעך וועבאַפּ איז אונטער קאַנסטראַקשאַן. דער אינהאַלט איז אַנרילייאַבאַל, מיסלידינג, פּאַרטיייש און שעדלעך. איך רעקאָמענדירן איר נישט צו נוצן עס אין קיין וועג. יעדער באַניץ איר מאַכן איז אויף דיין אייגענע ריזיקירן!</span></p>

        <p className="contact-email">
          💌 <a href="mailto:fragen@fragen-katalog.com">fragen@fragen-katalog.com</a>
        </p>

        <div style={{ textAlign: "center", marginTop: "1.5em" }}>
          <button
            onClick={handleHiFive}
            disabled={clicked && !IS_ME}
            style={{
              backgroundColor: clicked ? "#ccc" : "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "16px",
              cursor: clicked && !IS_ME ? "default" : "pointer",
              opacity: clicked && !IS_ME ? 0.7 : 1,
              transition: "background-color 0.3s ease",
              position: "relative",
            }}
          >
            {clicked ? "👋 Danke!" : "👋 High-Five"}
            {showAnimation && (
              <Player
                autoplay
                loop={false}
                src={confettiAnimation}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "150px",
                  width: "150px",
                  pointerEvents: "none",
                }}
              />
            )}
          </button>

          <p style={{ marginTop: "8px", fontSize: "14px", color: "#444" }}>
            {count} people gave a high-five!
          </p>
        </div>
      </div>
    </div>
  );
}
