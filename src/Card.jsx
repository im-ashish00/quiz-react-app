import React, { useState, useRef, useEffect } from 'react';

export default function Card({ card }) {
  const [flip, setFlip] = useState(false);
  // Managing height
  const [height, setHeight] = useState('initial');
  const frontRef = useRef();
  const backRef = useRef();
  function setMaxHeight() {
    const frontElementsHeight = frontRef.current.getBoundingClientRect().height;
    const backElementHeight = backRef.current.getBoundingClientRect().height;
    setHeight(Math.max(frontElementsHeight, backElementHeight, 100));
  }

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => {
      window.removeEventListener('resize', setMaxHeight);
    };
  }, []);
  // Everytime component loads update height
  useEffect(setMaxHeight, [card.question, card.answer, card.options]);

  return (
    <div
      onClick={() => {
        setFlip(!flip);
      }}
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
    >
      <div className="front" ref={frontRef}>
        {card.question}
        {card.options.map((option) => (
          <div key={option} className="card__options">
            {option}
          </div>
        ))}
      </div>
      <div className="back" ref={backRef}>
        {card.answer}
      </div>
    </div>
  );
}
