import React from "react";

export default function Flashcard({
  question,
  answers,
  correctIndex,
  selectedAnswer,
  onSelectAnswer,
  id,
  imageId, // ✅ new prop
}) {
  if (!question || !answers || answers.length === 0) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="flashcard">
      {/* Group question + answers together at the top */}
      <div className="question-section">
        {/* ✅ Optional image above question text */}
        {imageId && (
          <img
            src={`/images/${imageId}.png`}
            alt={`Bild zu Frage ${id}`}
            className="question-image"
          />
        )}

        <p className="question-text">{question}</p>

        <div className="answer-list">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer !== null;
            const isCorrect = index === correctIndex;
            const isChosen = index === selectedAnswer;

            let buttonClass = "answer-button";
            if (isSelected) {
              if (isCorrect) {
                buttonClass += " correct";
              } else if (isChosen) {
                buttonClass += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectAnswer(index);
                }}
                disabled={isSelected}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Always pinned to bottom right */}
      <div className="question-meta">Frage #{id}</div>
    </div>
  );
}
