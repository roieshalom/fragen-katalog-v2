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
    .slice(0, 10);

  const topWrong = [...questionStats]
    .filter((q) => q.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 10);

  const getQuestionText = (id) => {
    if (!Array.isArray(questions)) return `Frage #${id}`;
    const q = questions.find((q) => String(q.id) === String(id));
    return q?.question || `Frage #${id}`;
  };

  const jumpToQuestion = (id) => {
    const index = questions.findIndex((q) => String(q.id) === String(id));
    if (index !== -1) {
      onClose(index); // App.jsx will use this to jump to question
    }
  };

  return (
    <div
      className="about-modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("about-modal-overlay")) onClose();
      }}
    >
      <div className="about-modal" style={{ maxHeight: "500px", display: "flex", flexDirection: "column" }}>
        <button className="close-button" onClick={() => onClose()}>
          &times;
        </button>
        <h2 className="modal-title">Statistiken</h2>

        <div
          className="modal-content"
          style={{ overflowY: "auto", flex: 1, paddingRight: "10px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "60px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ marginBottom: "0", fontSize: "18px" }}>
                Beantwortete<br />Fragen
              </p>
              <p style={{ fontWeight: "bold", fontSize: "28px", color: "#888" }}>
                {totalAnswered}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ marginBottom: "0", fontSize: "18px" }}>
                Richtig<br />beantwortete
              </p>
              <p style={{ fontWeight: "bold", fontSize: "28px", color: "#888" }}>
                {correctPercentage}%
              </p>
            </div>
          </div>

          <h3 className="modal-subtitle" style={{ marginTop: "10px", marginBottom: "6px" }}>
            Top 10 Richtig beantwortete Fragen
          </h3>
          <ol style={{ marginTop: "0" }}>
            {topCorrect.map((q) => (
              <li key={q.id} style={{ marginBottom: "10px" }}>
                {getQuestionText(q.id)}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    jumpToQuestion(q.id);
                  }}
                >
                  Selbst beantworten
                </a>
              </li>
            ))}
          </ol>

          <h3 className="modal-subtitle" style={{ marginTop: "10px", marginBottom: "6px" }}>
            Top 10 Falsch beantwortete Fragen
          </h3>
          <ol style={{ marginTop: "0" }}>
            {topWrong.map((q) => (
              <li key={q.id} style={{ marginBottom: "10px" }}>
                {getQuestionText(q.id)}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    jumpToQuestion(q.id);
                  }}
                >
                  Selbst beantworten
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
