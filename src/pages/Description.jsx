import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDescriptionResults, selectApiKey, setDescriptionResults } from '../redux/slice';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Description.css'

export default function Description() {
  const results = useSelector(selectDescriptionResults);
  const apiKey = useSelector(selectApiKey);
  const dispatch = useDispatch();
  // Scorri verso l'alto quando la componente viene caricata
  window.scrollTo(0, 0);

  // Effetto collaterale per effettuare la richiesta HTTP e aggiornare lo stato Redux
  useEffect(() => {
    // Funzione asincrona per effettuare la richiesta
    async function fetchDescription() {
      try {
        // Ottieni l'ID del piatto dalla URL
        const id = decodeURIComponent(location.pathname.split('/description/')[1]);
        // Effettua la richiesta al server Spoonacular per ottenere le informazioni sul piatto
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: apiKey,
            },
          }
        );

        // Estrai i risultati dalla risposta e aggiorna lo stato Redux
        const results = response.data;
        dispatch(setDescriptionResults(results))
        console.log(results)  // Logga i risultati a scopo di debug
      } catch (error) {
        console.error('Error fetching data:', error.message);  // Logga eventuali errori di richiesta
      }
    }

    fetchDescription();  // Chiama la funzione per effettuare la richiesta
  }, [apiKey, dispatch]);  // Dipendenze per l'effetto collaterale

  // Funzione per convertire una stringa HTML in un oggetto per React
  const convertHtmlString = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div>
      {/* Renderizza il componente Navbar */}
      <Navbar />
  
      {/* Contenitore principale */}
      <div className='main_container'>
        {/* Contenitore per le informazioni sul piatto */}
        <div className='description_container'>
          {/* Immagine del piatto */}
          <div className='description_image'>
            <img src={results.image} alt={results.title} />
          </div>
  
          {/* Testo descrittivo del piatto */}
          <div className='description_text'>
            <h1>～{results.title}～
              <span>
                {/* Tempo di preparazione del piatto */}
                (Ready in {results.readyInMinutes} minutes)
              </span>
              {/* Icone per indicare le caratteristiche del piatto */}
              {results.vegetarian && <img src="../vegetarian-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.vegan && <img src="../vegan-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.veryHealthy && <img src="../heart-care-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.sustainable && <img src="../environment-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.glutenFree && <img src="../gluten-free-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.dairyFree && <img src="../dairy-free-product-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
            </h1>
            <br />
            {/* Riassunto del piatto in formato HTML */}
            <p dangerouslySetInnerHTML={convertHtmlString(results.summary)}></p>
          </div>
        </div>
  
        {/* Linea orizzontale decorativa */}
        <hr className='horizontal_line' />
        <br />
  
        {/* Elenco degli ingredienti del piatto */}
        <div className='description_ingredients'>
          <h2>INGREDIENTS</h2>
          <ol>
            {/* Mappa degli ingredienti */}
            {results.extendedIngredients &&
              results.extendedIngredients.map((item) => (
                <li className='list_ingredients' key={item.id}>
                  {/* Nome del reparto degli ingredienti e ingrediente originale */}
                  <strong>{item.aisle && `${item.aisle}:`}</strong> {item.original}
                </li>
              ))}
            <br />
          </ol>
        </div>
  
        {/* Linea orizzontale decorativa */}
        <hr className='horizontal_line' />
        <br />
  
        {/* Istruzioni per la preparazione del piatto */}
        <div className='description_instructions'>
          <h2>INSTRUCTIONS</h2>
          {/* Istruzioni in formato HTML */}
          <p dangerouslySetInnerHTML={convertHtmlString(results.instructions)}></p>
        </div>
        <br />
      </div>
    </div>
  );
}