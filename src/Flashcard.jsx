import React from "react";

export default function Flashcard({
  question,
  answers,
  correctIndex,
  selectedAnswer,
  onSelectAnswer,
  id,
  imageId,
}) {
  console.log("Image ID:", imageId); // 🧪 debug log

  if (!question || !answers || answers.length === 0) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="flashcard">
      <div className="question-section">

        {/* ✅ show image if applicable */}
        {imageId && (
          <img
            src={`/images/${imageId}.png`}
            alt={`Bild zu Frage ${id}`}
            className="question-image"
            style={{
              width: '100%',
              maxHeight: '120px',
              objectFit: 'contain',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
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

      <div className="question-meta">Frage #{id}</div>
    </div>
  );
}
