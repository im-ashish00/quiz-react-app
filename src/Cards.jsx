import React from "react";
import Card from "./Card";
export default function Cards({ cards }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
