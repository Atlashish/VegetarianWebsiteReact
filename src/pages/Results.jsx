import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDescriptionResults, selectResultsArray, selectApiKey } from '../redux/slice';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function Results() {
  const results = useSelector(selectResultsArray);
  const apiKey = useSelector(selectApiKey);
  const navigate = useNavigate();
  const dispatch = useDispatch();


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

        dispatch(setDescriptionResults(response.data))
        navigate(`/description/${id}`);
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