import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function Results() {
  const location = useLocation();
  const results = location.state.results;
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
  const navigate = useNavigate();


    async function handleClick(id) {
      try {
        const response = await axios.get (
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: apiKey,
            },
          }
        );

        const results = response.data
        console.log(results);

        navigate(`/description/${id}`, { state: { results } });
      } catch (error) {
        console.error('Error fetching data:', error.message);
    }}

  return (
    <div>
      <Navbar />
      <div className='results_container'>
        {results && results.map((result) => (
          <div
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick(result.id)}
          key={result.id}
        >
          <Card
            title={result.title}
            image={result.image}
            alt={result.title}
          />
        </div>
        ))}
        {!results && alert('No results')}
      </div>
    </div>
  );
}