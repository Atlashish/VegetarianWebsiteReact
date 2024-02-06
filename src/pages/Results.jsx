// Import delle librerie e dei componenti necessari da React e Redux
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedParam, selectResultsArray, setDescriptionId, selectApiKey, setSearch, setResultsArray, selectOffset, setOffset } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Results.css'; // Import dello stile CSS per la componente Results

// Definizione e esportazione della componente Results
export default function Results() {
  // Estrazione dei dati dallo stato Redux utilizzando gli hook useSelector
  const results = useSelector(selectResultsArray);
  const selectedParam = useSelector(selectSelectedParam);
  const apiKey = useSelector(selectApiKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offset = useSelector(selectOffset);

  // Effetto collaterale per effettuare la ricerca iniziale all'avvio del componente
  useEffect(() => {
    async function fetchInitialResults() {
      try {
        // Ottieni la ricerca iniziale dall'URL e imposta la query di ricerca nello stato Redux
        const initialSearch = decodeURIComponent(location.pathname.split('/results/')[1]);
        dispatch(setSearch(initialSearch));

        // Effettua una richiesta al server Spoonacular per ottenere i risultati iniziali
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              diet: 'vegetarian',
              [selectedParam]: initialSearch, // Imposta la query di ricerca in base al parametro selezionato
              number: 40, // Numero massimo di risultati da ottenere
            },
          }
        );

        // Estrai i risultati iniziali dalla risposta e aggiornali nello stato Redux
        const initialResults = response.data.results;
        dispatch(setResultsArray(initialResults));
      } catch (error) {
        console.error('Error fetching initial results:', error.message); // Gestione degli errori di richiesta
      }
    }

    fetchInitialResults(); // Esegui la ricerca iniziale all'avvio del componente
  }, [apiKey, dispatch, selectedParam]); // Dipendenze per l'effetto collaterale

  // Funzione per gestire il click su un risultato e navigare alla pagina di descrizione
  async function handleClick(id) {
    dispatch(setDescriptionId(id)); // Imposta l'ID del piatto nella memoria Redux
    navigate(`/description/${encodeURIComponent(id)}`); // Naviga alla pagina di descrizione
  }

  // Funzione per ottenere ulteriori risultati
  async function newResults() {
    try {
      // Effettua una richiesta al server Spoonacular per ottenere ulteriori risultati
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey: apiKey,
            diet: 'vegetarian',
            number: 40, // Numero massimo di risultati da ottenere
            offset: offset, // Offset per la paginazione
          },
        }
      );

      // Estrai i risultati aggiuntivi dalla risposta e aggiornali nello stato Redux
      const additionalResults = response.data.results;
      dispatch(setResultsArray([...results, ...additionalResults])); // Aggiungi i nuovi risultati agli esistenti
      dispatch((prev) => setOffset(prev + 40)); // Aggiorna l'offset per la paginazione
    } catch (error) {
      console.error('Error fetching additional results:', error.message); // Gestione degli errori di richiesta
    }
  }


  // Ritorna il markup della componente Results
  return (
    <div>
      <Navbar /> {/* Renderizza il componente Navbar */}
      <div className='results_container'> {/* Contenitore dei risultati */}
        {results && results.length > 0 ? ( // Verifica se ci sono risultati 
          // Mappa dei risultati e renderizza i componenti Card corrispondenti
          results.map((result) => (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(result.id)} // Gestisce il click su un risultato
              key={result.id}
            >
              <Card
                title={result.title}
                image={result.image}
                alt={result.title}
              />
            </div>
          ))
        ) : (
          // Messaggio in caso di assenza di risultati
          <p>No results found</p>
        )}
      </div>
      <div className='load_more'> {/* Bottone per caricare ulteriori risultati */}
        {results && results.length > 0 && results.length >= 40 && <button onClick={newResults}>Load More</button>}
      </div>
    </div>
  );
}