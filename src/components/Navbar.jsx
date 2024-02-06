// Import delle librerie e dei componenti necessari da React e Redux
import { useNavigate } from 'react-router-dom'; // Importa l'hook useNavigate per la navigazione
import axios from 'axios'; // Importa Axios per le richieste HTTP
import { useDispatch, useSelector } from 'react-redux'; // Importa gli hook useDispatch e useSelector da React Redux
import { selectSelectedParam, setSearch, setResultsArray, selectSearch, selectApiKey, clearDescriptionResults } from '../redux/slice'; // Importa gli action creators e i selettori dalla slice Redux
import './Navbar.css'; // Import dello stile CSS per la componente Navbar

// Definizione e esportazione della componente Navbar
export default function Navbar() {
  // Dichiarazione delle variabili con gli hook useSelector e useDispatch
  const navigate = useNavigate(); // Ottiene la funzione di navigazione
  const dispatch = useDispatch(); // Ottiene la funzione di dispatch Redux
  const apiKey = useSelector(selectApiKey); // Ottiene la chiave API dallo stato Redux
  const search = useSelector(selectSearch); // Ottiene il termine di ricerca dallo stato Redux
  const selectedParam = useSelector(selectSelectedParam); // Ottiene il parametro selezionato dallo stato Redux

  // Funzione per gestire il cambio del valore nella barra di ricerca
  function handleChange(event) {
    dispatch(setSearch(event.target.value)); // Imposta il termine di ricerca nello stato Redux
  }

  // Funzione per gestire il click sul pulsante di ricerca
  async function handleClick() {
    try {
      if (search.trim() !== '') { // Verifica se il termine di ricerca non è vuoto
        // Effettua una richiesta al server Spoonacular per ottenere i risultati della ricerca
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              diet: 'vegetarian',
              [selectedParam]: search, // Imposta il termine di ricerca in base al parametro selezionato
              number: 40, // Numero massimo di risultati da ottenere
            },
          }
        );

        // Estrai i risultati dalla risposta e aggiornali nello stato Redux
        const results = response.data.results;
        dispatch(setResultsArray(results));

        // Naviga alla pagina dei risultati con il termine di ricerca nella URL
        navigate(`/results/${search}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message); // Gestione degli errori di richiesta
    }
  }

  // Funzione per tornare alla pagina precedente e pulire i risultati della descrizione
  function goBack() {
    dispatch(clearDescriptionResults()); // Pulisce i risultati della descrizione dalla memoria Redux
    navigate(-1); // Naviga alla pagina precedente
  }

  // Ritorna il markup della componente Navbar
  return (
    <nav className='navbar'>
      {/* Pulsante per tornare alla pagina precedente */}
      <button className='button_navbar' onClick={goBack}>
        <span> ◀ Go Back</span>
      </button>

      {/* Casella di ricerca */}
      <div className='search_bar_box_navbar'>
        {/* Input per la ricerca */}
        <input
          className='search_bar_navbar'
          name='search_recipe'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={handleChange} // Gestisce il cambio del valore nella barra di ricerca
        />
        {/* Pulsante per avviare la ricerca */}
        <button className='search_button_navbar' onClick={handleClick}>
          🔎
        </button>
      </div>

      {/* Pulsante per tornare alla homepage */}
      <div>
        <button className='button_navbar' onClick={() => navigate('/')}>
          <span>Home</span>
        </button>
        {/* Pulsante per visualizzare ricette casuali */}
        {/* <button className='button_random_recipes' onClick={randomRecipes}>Random Recipe</button> */}
      </div>
    </nav>
  );
}
