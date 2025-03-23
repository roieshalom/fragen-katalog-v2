import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import AboutModal from "./AboutModal";
import StreakProgressBar from "./StreakProgressBar";
import "./style.css";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [triggerCelebration, setTriggerCelebration] = useState(false);

  const imageQuestionNumbers = new Set([
    21, 55, 70, 130, 176, 181, 187, 209, 216, 226, 235, 301, 308
  ]);

  useEffect(() => {
    const jsonPath = '/data/questions.json';

    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const formattedQuestions = data.map((item) => {
          const qNum = item.question_number;
          return {
            id: qNum ?? "N/A",
            question: item.question ?? "No question provided",
            answers: item.options ?? [],
            correct: item.options ? item.options.indexOf(item.correct_answer) : -1,
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

  const handleSelectAnswer = (index) => {
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
          <a href="#" className="about-link" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>About</a>
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
              <p className="total-questions">Insgesamt: {questions.length} Fragen</p>
            </div>
          </>
        ) : (
          <p className="error-text">❌ Keine Fragen verfügbar. Bitte die JSON-Datei prüfen.</p>
        )}
      </main>

      {showAbout && (
        <div className="about-modal-overlay" onClick={handleOverlayClick}>
          <div className="about-modal">
            <button className="close-button" onClick={() => setShowAbout(false)}>×</button>
            <p><strong>DE</strong><br />Die Nutzung dieser privaten Webanwendung erfolgt auf eigene Gefahr. Der Inhalt ist unzuverlässig, irreführend, unvollständig und möglicherweise schädlich. Ich empfehle dringend, diese Anwendung nicht zu verwenden.</p>
            <p><strong>EN</strong><br />This private and personal webapp is under construction. The content is unreliable, misleading, partial and harmful. I strongly recommend you not to use it in any way. Any usage you make is at your own risk!</p>
            <p><strong>YI</strong><br /><span style={{ direction: 'rtl', textAlign: 'right', display: 'block' }}>דער פּריוואַט און פּערזענלעך וועבאַפּ איז אונטער קאַנסטראַקשאַן. דער אינהאַלט איז אַנרילייאַבאַל, מיסלידינג, פּאַרטיייש און שעדלעך. איך רעקאָמענדירן איר נישט צו נוצן עס אין קיין וועג. יעדער באַניץ איר מאַכן איז אויף דיין אייגענע ריזיקירן!</span></p>
            <p className="contact-email">💌 <a href="mailto:fragen@fragen-katalog.com">fragen@fragen-katalog.com</a></p>
          </div>
        </div>
      )}
    </div>
  );
}
