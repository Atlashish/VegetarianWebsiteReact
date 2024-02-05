import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDescriptionResults, selectResultsArray, setDescriptionId, selectApiKey, setSearch, setResultsArray} from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Results.css'

export default function Results() {
  const results = useSelector(selectResultsArray);
  const apiKey = useSelector(selectApiKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // Funzione per eseguire la ricerca iniziale all'avvio del componente
    async function fetchInitialResults() {
      try {

        const initialSearch = decodeURIComponent(location.pathname.split('/results/')[1]);
        dispatch(setSearch(initialSearch));

        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              diet: 'vegetarian',
              query: initialSearch,  // Query vuota per ottenere risultati iniziali
              number: 40,
            },
          }
        );

        const initialResults = response.data.results;
        dispatch(setResultsArray(initialResults));
      } catch (error) {
        console.error('Error fetching initial results:', error.message);
      }
    }

    fetchInitialResults(); // Esegui la ricerca iniziale all'avvio del componente
  }, [apiKey, dispatch]);

  async function handleClick(id) {
    dispatch(setDescriptionId(id))
    navigate(`/description/${encodeURIComponent(id)}`);
  }

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