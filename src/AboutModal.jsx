import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { Player } from "@lottiefiles/react-lottie-player";
import confettiAnimation from "./animations/confetti.json";
import "./style.css";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export default function AboutModal({ onClose }) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // 👇 Your email for testing override
  const IS_ME = true; // set to false before going live!

  useEffect(() => {
    const checkClicked = localStorage.getItem("hiFiveClicked");
    if (checkClicked && !IS_ME) setClicked(true); // Only respect it if not you

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
    logEvent(analytics, "about_modal_opened");
  }, []);

  const handleHiFive = async () => {
    // Prevent spamming by checking local storage and state
    if (clicked || localStorage.getItem("hiFiveClicked")) return;
  
    setClicked(true);
    localStorage.setItem("hiFiveClicked", "true");
  
    const ref = doc(db, "global", "hiFive");
    await updateDoc(ref, { count: count + 1 });
  
    setCount(count + 1);
  
    // 🎉 Show animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  
    // 🔥 Log hi-five clicked
    logEvent(analytics, "hi_five_clicked");
  };
  

  return (
    <div className="about-modal-overlay">
      <div className="about-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <p><strong>DE</strong><br />Die Nutzung dieser privaten Webanwendung erfolgt auf eigene Gefahr. Der Inhalt ist unzuverlässig, irreführend, unvollständig und möglicherweise schädlich. Ich empfehle dringend, diese Anwendung nicht zu verwenden.</p>
        <p><strong>EN</strong><br />This private and personal webapp is under construction. The content is unreliable, misleading, partial and harmful. I strongly recommend you not to use it in any way. Any usage you make is at your own risk!</p>
        <p><strong>YI</strong><br /><span className="yiddish-block">דער פּריוואַט און פּערזענלעך וועבאַפּ איז אונטער קאַנסטראַקשאַן. דער אינהאַלט איז אַנרילייאַבאַל, מיסלידינג, פּאַרטיייש און שעדלעך. איך רעקאָמענדירן איר נישט צו נוצן עס אין קיין וועג. יעדער באַניץ איר מאַכן איז אויף דיין אייגענע ריזיקירן!</span></p>

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
                top: "50%",                // 💡 center vertically on the button
                left: "50%",
                transform: "translate(-50%, -50%)", // 💡 center horizontally & vertically
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
