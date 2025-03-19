import React from "react";

export default function Flashcard({ question, answers, correctIndex, selectedAnswer, onSelectAnswer }) {
  console.log("🟡 Flashcard Props:", { question, answers, correctIndex });

  if (!question || !answers || answers.length === 0) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="flashcard">
      <p className="question">{question}</p>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer ${
              selectedAnswer !== null 
                ? index === correctIndex 
                  ? "correct" 
                  : index === selectedAnswer 
                  ? "wrong" 
                  : "" 
                : ""
            }`}
            onClick={() => onSelectAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
