// src/StatsModal.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./style.css";

export default function StatsModal({ onClose }) {
  const [topCorrect, setTopCorrect] = useState([]);
  const [topWrong, setTopWrong] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, "questionStats"));
      const data = [];

      snapshot.forEach(doc => {
        const d = doc.data();
        data.push({ id: doc.id, ...d });
      });

      const sortedCorrect = [...data]
        .sort((a, b) => b.correct - a.correct)
        .slice(0, 10);

      const sortedWrong = [...data]
        .sort((a, b) => b.wrong - a.wrong)
        .slice(0, 10);

      setTopCorrect(sortedCorrect);
      setTopWrong(sortedWrong);
    };

    fetchStats();
  }, []);

  return (
    <div className="about-modal-overlay" onClick={(e) => {
      if (e.target.classList.contains("about-modal-overlay")) onClose();
    }}>
      <div className="about-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Statistik</h2>

        <h3>Top 10: Richtig beantwortete Fragen</h3>
        <ul>
          {topCorrect.map((q) => (
            <li key={q.id}>Frage {q.id}: {q.correct}x richtig</li>
          ))}
        </ul>

        <h3>Top 10: Falsch beantwortete Fragen</h3>
        <ul>
          {topWrong.map((q) => (
            <li key={q.id}>Frage {q.id}: {q.wrong}x falsch</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
