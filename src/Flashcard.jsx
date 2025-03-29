import React, { useState, useEffect } from "react";

export default function Flashcard({
  question,
  answers,
  correctIndex,
  selectedAnswer,
  onSelectAnswer,
  id,
  imageId
}) {
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowLightbox(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!question || !answers || answers.length === 0) {
    return <p className="text-base">Loading question...</p>;
  }

  const imageUrl = imageId ? `/images/${imageId}.png` : null;

  return (
    <>
      <div className="flashcard">
        <div className="question-section">
          {/* Optional image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Bild zur Frage ${id}`}
              className="question-image"
              onClick={() => setShowLightbox(true)}
            />
          )}

          <p className="question-text text-base font-medium mb-4 mt-2">{question}</p>

          <div className="answer-list">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer !== null;
              const isCorrect = index === correctIndex;
              const isChosen = index === selectedAnswer;

              let buttonClass = "answer-button text-base";
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

        <div className="question-meta text-sm text-muted-light">Frage #{id}</div>
      </div>

      {/* Lightbox Overlay */}
      {showLightbox && imageUrl && (
        <div className="lightbox-overlay" onClick={() => setShowLightbox(false)}>
          <img
            src={imageUrl}
            alt={`Frage ${id} groß`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()} // don't close when clicking image itself
          />
        </div>
      )}
    </>
  );
}
