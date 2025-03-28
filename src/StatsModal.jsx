import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function StatsModal({ onClose, questions }) {
  const [questionStats, setQuestionStats] = useState([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questionStats"), (snapshot) => {
      const stats = [];
      let total = 0;
      let correct = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        stats.push({ id: doc.id, ...data });
        total += data.total || 0;
        correct += data.correct || 0;
      });

      setQuestionStats(stats);
      setTotalAnswered(total);
      setCorrectCount(correct);
    });

    return () => unsubscribe();
  }, []);

  const correctPercentage = totalAnswered
    ? Math.round((correctCount / totalAnswered) * 100)
    : 0;

  const topCorrect = [...questionStats]
    .filter((q) => q.correct > 0)
    .sort((a, b) => b.correct - a.correct)
    .slice(0, 3);

  const topWrong = [...questionStats]
    .filter((q) => q.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 3);

  const getQuestionText = (id) => {
    if (!Array.isArray(questions)) return `Frage #${id}`;
    const q = questions.find((q) => String(q.id) === String(id));
    return q?.question || `Frage #${id}`;
  };

  const jumpToQuestion = (id) => {
    const index = questions.findIndex((q) => String(q.id) === String(id));
    if (index !== -1) {
      onClose(index);
    }
  };

  return (
    <div
      className="about-modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("about-modal-overlay")) onClose();
      }}
    >
      <div className="about-modal">
        <button className="close-button" onClick={() => onClose()}>
          &times;
        </button>
        <h2 className="modal-title">Statistiken</h2>

        <div className="modal-content">
          <div className="stats-summary">
            <div className="stats-summary-box">
              <p>Beantwortete<br />Fragen</p>
              <p className="big-number">{totalAnswered}</p>
            </div>
            <div className="stats-summary-box">
              <p>Richtig<br />beantwortete</p>
              <p className="big-number">{correctPercentage}%</p>
            </div>
          </div>

          <h3 className="modal-subtitle">
            Top 3 <span className="green-text">Richtig</span> beantwortete Fragen
          </h3>
          <div className="answer-list">
            {topCorrect.map((q) => (
              <div
                key={q.id}
                className="answer-button"
                onClick={() => jumpToQuestion(q.id)}
              >
                {getQuestionText(q.id)}
              </div>
            ))}
          </div>

          <h3 className="modal-subtitle" style={{ marginTop: "20px" }}>
            Top 3 <span className="red-text">Falsch</span> beantwortete Fragen
          </h3>
          <div className="answer-list">
            {topWrong.map((q) => (
              <div
                key={q.id}
                className="answer-button"
                onClick={() => jumpToQuestion(q.id)}
              >
                {getQuestionText(q.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
