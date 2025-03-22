import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const MAX_STREAK = 1;

export default function StreakProgressBar({ streak, triggerCelebration, onResetStreak }) {
  const percentage = Math.min((streak / MAX_STREAK) * 100, 100);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (streak === MAX_STREAK) {
      // Trigger visible confetti
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1500); // keep visible for 1.5 sec
      return () => clearTimeout(timer);
    }
  }, [streak]);

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
          {streak === MAX_STREAK && (
            <button className="streak-reset-inline" onClick={onResetStreak}>
              Reset
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={800}
            gravity={0.2}
            recycle={false}
            run={showConfetti}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
