import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((response) => response.json())
      .then((data) => {
        // Convert JSON structure to match expected format
        const formattedQuestions = data.map((item) => ({
          id: item.question_number, // ✅ Use correct field for ID
          question: item.question, // ✅ Use "question" as-is
          answers: item.options, // ✅ Use "options" instead of "answers"
          correct: item.options.indexOf(item.correct_answer), // ✅ Find the index of the correct answer
        }));
  
        console.log("✅ Converted Questions:", formattedQuestions); // Debugging log
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
    <div className="container">
      <h1>Fragen-Katalog</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <>
          <Flashcard 
            question={questions[currentQuestion].question || "Loading..."} 
            answers={questions[currentQuestion].answers || []} 
            correctIndex={questions[currentQuestion].correct || 0} 
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
        <p>No questions available.</p>
      )}
    </div>
  );
}
