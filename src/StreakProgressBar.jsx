import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const MAX_STREAK = 1;

export default function StreakProgressBar({ streak, triggerCelebration, onResetStreak }) {
  const percentage = Math.min((streak / MAX_STREAK) * 100, 100);
  const { width, height } = useWindowSize();

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
        {triggerCelebration && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
