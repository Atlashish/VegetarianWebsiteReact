import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const results  = location.state.results;

  return (
    <div>
      <h1>Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.title}
            <img src={result.image} alt={result.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}