import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Adjust path for GitHub Pages vs. Localhost
    const basePath = window.location.pathname.includes("fragen-katalog") ? "/fragen-katalog" : "";
    const jsonPath = `${basePath}/data/questions.json`;

    console.log("📂 Fetching questions from:", jsonPath); // Debugging log

    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ JSON Loaded:", data);

        // Convert JSON structure to match what the Flashcard component expects
        const formattedQuestions = data.map((item) => ({
          id: item.question_number, // Use correct field for ID
          question: item.question, // Use "question" as-is
          answers: item.options, // Use "options" instead of "answers"
          correct: item.options.indexOf(item.correct_answer), // Find the index of the correct answer
        }));

        console.log("🟢 Converted Questions:", formattedQuestions);
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

  console.log("🔍 Current Question Data:", questions[currentQuestion]); // Debugging log

  return (
    <div className="container">
      <h1>Fragen-Katalog</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 && questions[currentQuestion] ? (
        <>
          <Flashcard 
            question={questions[currentQuestion]?.question || "No question data"} 
            answers={questions[currentQuestion]?.answers || []} 
            correctIndex={questions[currentQuestion]?.correct || 0} 
            selectedAnswer={selectedAnswer} 
            onSelectAnswer={handleSelectAnswer} 
          />

          <div className="controls">
            <button onClick={prevQuestion}>Previous</button>
            <button onClick={randomQuestion}>Random</button>
            <button onClick={nextQuestion}>Next</button>
          </div>

          <p className="question-number">#{questions[currentQuestion]?.id}</p>
          <p className="total-questions">Total questions: {questions.length}</p>
        </>
      ) : (
        <p>❌ No questions available.</p>
      )}
    </div>
  );
}
