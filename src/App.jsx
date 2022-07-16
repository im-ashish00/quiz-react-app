import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import './App.css';
export default function App() {
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10').then((res) => {
      setData(
        res.data.results.map((ques, index) => {
          const options = [
            decodeString(ques.correct_answer),
            ...ques.incorrect_answers.map((element) => decodeString(element)),
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(ques.question),
            answer: decodeString(ques.correct_answer),
            options: options.sort(() => Math.random - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const element = document.createElement('textarea');
    element.innerHTML = str;
    return element.value;
  }
  // Holding data in a state
  const SAMPLE_API_DATA = [
    {
      id: 1,
      question: 'what is your favorite number?',
      answer: '24',
      options: ['12', '16', '28', '24'],
    },
    {
      id: 2,
      question: 'what is your favorite color?',
      answer: 'blue',
      options: ['blue', 'green', 'cyan', 'silver'],
    },
  ];
  const [data, setData] = useState(SAMPLE_API_DATA);
  return (
    <>
    
      <div className="container">
        <Cards cards={data} />
      </div>
    </>
  );
}
