import React, { useState } from "react";
import Cards from "./Cards";
import "./App.css"
export default function App() {
  // Holding data in a state
  const SAMPLE_API_DATA = [
    {
      id: 1,
      question: "what is your favorite number?",
      answer: "24",
      options: ["12", "16", "28", "24"]
    },
    {
      id: 2,
      question: "what is your favorite color?",
      answer: "blue",
      options: ["blue", "green", "cyan", "silver"]
    }
  ];
  const [data, setData] = useState(SAMPLE_API_DATA);
  return <Cards cards={data} />;
}
