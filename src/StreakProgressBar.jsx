import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const MAX_STREAK = 1;

export default function StreakProgressBar({ streak, triggerCelebration, onResetStreak }) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [confettiCount, setConfettiCount] = useState(0);
  const [runConfetti, setRunConfetti] = useState(false);

  const percentage = Math.min((streak / MAX_STREAK) * 100, 100);
  const isFull = streak === MAX_STREAK;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isFull) {
      setConfettiCount(25000);     // 🎉 start burst
      setRunConfetti(true);      // ✅ trigger visible confetti

      const stopGenerating = setTimeout(() => {
        setConfettiCount(0);     // 🛑 stop generating new
      }, 800);

      const stopRunning = setTimeout(() => {
        setRunConfetti(false);   // 🧹 turn off confetti animation
      }, 3000);

      return () => {
        clearTimeout(stopGenerating);
        clearTimeout(stopRunning);
      };
    }
  }, [isFull]);

  return (
    <div className="streak-wrapper">
      <div className="streak-bar-background">
        <motion.div
          className="streak-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4 }}
        />

        <div className="streak-bar-content">
          <span className="streak-text">17 richtige Fragen</span>
          {isFull && (
            <button className="streak-reset-inline" onClick={onResetStreak}>
              Reset
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {runConfetti && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={confettiCount}
            gravity={0.4}
            recycle={false}
            run={true} // keep it running so existing pieces fall
          />
        )}
      </AnimatePresence>
    </div>
  );
}
