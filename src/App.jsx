import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cards from './Cards';
import './App.css';
export default function App() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);
  function decodeString(str) {
    const element = document.createElement('textarea');
    element.innerHTML = str;
    return element.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          category: categoryEl.current.value,
          amount: amountEl.current.value,
        },
      })
      .then((res) => {
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
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <Cards cards={data} />
      </div>
    </>
  );
}
