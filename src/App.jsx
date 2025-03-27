import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import AboutModal from "./AboutModal";
import StreakProgressBar from "./StreakProgressBar";
import "./style.css";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import { doc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "./firebase";
import StatsModal from "./StatsModal";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [triggerCelebration, setTriggerCelebration] = useState(false);

  const [showStats, setShowStats] = useState(false);
  const SHOW_STATS = true;

  const imageQuestionNumbers = new Set([
    21, 55, 70, 130, 176, 181, 187, 209, 216, 226, 235, 301, 308,
  ]);

  useEffect(() => {
    const jsonPath = "/data/questions.json";

    if (analytics) {
      logEvent(analytics, "test_event_fired");
      console.log("📤 test_event_fired sent");
    }

    fetch(jsonPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const formattedQuestions = data.map((item) => {
          const qNum = item.question_number;
          return {
            id: qNum ?? "N/A",
            question: item.question ?? "No question provided",
            answers: item.options ?? [],
            correct: item.options
              ? item.options.indexOf(item.correct_answer)
              : -1,
            imageId: imageQuestionNumbers.has(qNum) ? qNum : null,
          };
        });

        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error loading questions:", error);
        setLoading(false);
      });
  }, []);

  const handleSelectAnswer = async (index) => {
    const isCorrect = index === questions[currentQuestion]?.correct;
    setSelectedAnswer(index);

    if (isCorrect) {
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);
      if (newStreak === 17) {
        setTriggerCelebration(true);
        setTimeout(() => {
          setTriggerCelebration(false);
        }, 3000);
      }
    } else {
      setCorrectStreak(0);
    }

    const questionId = String(questions[currentQuestion]?.id);

    // ✅ Log to Firebase Analytics
    if (analytics) {
      logEvent(analytics, "question_answered", {
        question_id: questionId,
        correct: isCorrect,
      });
    }

    // ✅ Track to Firestore
    try {
      const statsRef = doc(db, "questionStats", questionId);

      console.log("⬆️ Trying to update Firestore for", questionId);

      await updateDoc(statsRef, {
        total: increment(1),
        correct: isCorrect ? increment(1) : increment(0),
        wrong: !isCorrect ? increment(1) : increment(0),
      });

      console.log(
        `📊 Firestore updated: Frage ${questionId} → ${
          isCorrect ? "richtig" : "falsch"
        }`
      );
    } catch (err) {
      console.error("❌ Firestore update failed:", err);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  const prevQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const randomQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestion(Math.floor(Math.random() * questions.length));
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("about-modal-overlay")) {
      setShowAbout(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-titles">
            <h1 className="app-title">Fragen-Katalog</h1>
            <p className="subtitle">Under Construction</p>
          </div>
          <div className="header-links">
            {SHOW_STATS && (
              <a
                href="#"
                className="about-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowStats(true);
                }}
              >
                Statistiken
              </a>
            )}
            <a
              href="#"
              className="about-link"
              onClick={(e) => {
                e.preventDefault();
                setShowAbout(true);
              }}
            >
              Über
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <p className="loading-text">Loading questions...</p>
        ) : questions.length > 0 ? (
          <>
            <StreakProgressBar
              streak={correctStreak}
              triggerCelebration={triggerCelebration}
              onResetStreak={() => setCorrectStreak(0)}
            />

            <Flashcard
              id={questions[currentQuestion]?.id}
              question={questions[currentQuestion]?.question}
              answers={questions[currentQuestion]?.answers}
              correctIndex={questions[currentQuestion]?.correct}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              imageId={questions[currentQuestion]?.imageId}
            />

            <div className="controls">
              <button onClick={prevQuestion}>◀︎ Zurück</button>
              <button onClick={randomQuestion}>Zufällig</button>
              <button onClick={nextQuestion}>Weiter ▶︎</button>
            </div>

            <div className="info-footer">
              <p className="total-questions">
                Insgesamt: {questions.length} Fragen
              </p>
            </div>
          </>
        ) : (
          <p className="error-text">
            ❌ Keine Fragen verfügbar. Bitte die JSON-Datei prüfen.
          </p>
        )}
      </main>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showStats && (
        <StatsModal
          onClose={(jumpToIndex) => {
            setShowStats(false);
            if (typeof jumpToIndex === "number") {
              setCurrentQuestion(jumpToIndex);
            }
          }}
          questions={questions}
        />
      )}
    </div>
  );
}
