import React, { useState } from "react";

export default function Card({ card }) {
  const [flip, setFlip] = useState(false);
  return (
    <div
      onClick={() => {
        setFlip(!flip);
      }}
      className={`card ${flip ? "flip" : ""}`}
    >
      <div className="front">
        {card.question}
        {card.options.map((option) => (
          <div key={option} className="card__options">
            {option}
          </div>
        ))}
      </div>
      <div className="back">{card.answer}</div>
    </div>
  );
}
