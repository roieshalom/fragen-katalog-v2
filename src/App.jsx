import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import "./style.css"; // Ensure styles apply globally

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jsonPath = '/data/questions.json';


    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const formattedQuestions = data.map((item) => ({
          id: item.question_number ?? "N/A",
          question: item.question ?? "No question provided",
          answers: item.options ?? [],
          correct: item.options ? item.options.indexOf(item.correct_answer) : -1,
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error loading questions:", error);
        setLoading(false);
      });
  }, []);

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
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

  return (
    <div className="app-wrapper">
      <header className="app-header">
  <div className="header-inner">
    <div className="header-titles">
      <h1 className="app-title">Fragen-Katalog</h1>
      <p className="subtitle">Under Construction</p>
    </div>
    <a href="#" className="about-link">About</a>
  </div>
</header>


      <main className="main-content">
        {loading ? (
          <p className="loading-text">Loading questions...</p>
        ) : questions.length > 0 ? (
          <>
            <Flashcard
              id={questions[currentQuestion]?.id}
              question={questions[currentQuestion]?.question}
              answers={questions[currentQuestion]?.answers}
              correctIndex={questions[currentQuestion]?.correct}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
            />

            <div className="controls">
              <button onClick={prevQuestion}>Zurück</button>
              <button onClick={randomQuestion}>Zufällig</button>
              <button onClick={nextQuestion}>Weiter</button>
            </div>

            <div className="info-footer">
              <p className="total-questions">Insgesamt: {questions.length} Fragen</p>
            </div>
          </>
        ) : (
          <p className="error-text">❌ Keine Fragen verfügbar. Bitte die JSON-Datei prüfen.</p>
        )}
      </main>
    </div>
  );
}
