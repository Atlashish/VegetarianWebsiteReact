import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSearch, setSelectedParam,
  setCarouselImages, setResultsArray,
  selectSearch, selectCarouselImages,
  selectApiKey, selectSelectedParam
} from '../redux/slice';
import axios from 'axios';
import './Home.css'

export default function Home() {
  const dispatch = useDispatch(); // Hook per inviare azioni allo store Redux
  const navigate = useNavigate(); // Hook per la navigazione
  const search = useSelector(selectSearch); // Hook per ottenere lo stato di ricerca dallo store
  const selectedParam = useSelector(selectSelectedParam); // Hook per ottenere il parametro di ricerca selezionato
  const carouselImages = useSelector(selectCarouselImages); // Hook per ottenere le immagini del carousel dallo store
  const apiKey = useSelector(selectApiKey); // Hook per ottenere l'API key dallo store

  // Effetto useEffect per caricare le immagini del carousel all'avvio della pagina
  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              diet: 'vegetarian',
              number: 100,
            },
          }
        );

        const carouselResults = response.data.results;
        dispatch(setCarouselImages(carouselResults)); // Aggiorna lo store Redux con le immagini del carousel
      } catch (error) {
        console.error('Error fetching carousel images:', error.message);
      }
    }

    fetchCarouselImages(); // Chiamata alla funzione per caricare le immagini del carousel

  }, [apiKey, dispatch]); // Dipendenze per l'effetto useEffect

  // Funzione per gestire il cambiamento dell'input di ricerca e dei filtri
  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'search_recipe') {
      dispatch(setSearch(value)); // Aggiorna lo stato di ricerca nel Redux store
    } else if (name === 'Filters') {
      dispatch(setSelectedParam(value)); // Aggiorna il parametro di ricerca selezionato nel Redux store
    }
  }

  // Funzione per gestire il click sul pulsante di ricerca
  async function handleClick() {
    try {
      if (search.trim() !== '') {
        const params = {
          apiKey: apiKey,
          diet: 'vegetarian',
          number: 40,
        };

        params[selectedParam] = search; // Aggiunge il parametro di ricerca ai parametri della richiesta API

        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          { params: params }
        );

        const results = response.data.results;
        dispatch(setResultsArray(results)); // Aggiorna lo store Redux con i risultati della ricerca
        navigate(`/results/${encodeURIComponent(search)}`); // Naviga alla pagina dei risultati con il termine di ricerca nell'URL
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // Renderizza il componente Home
  return (
    <div className='main_div'>
      <div className='home_div'>
        <h1>
          Search your <span>Vegetarian</span> recipes!📖
        </h1>
        <div className='search_bar_box'>
          <input
            className='search_bar'
            name='search_recipe'
            type='text'
            placeholder='Search...'
            value={search}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleClick(); // Se viene premuto il tasto "Enter", esegui la ricerca
              }
            }}
          />
          <button className='search_button' onClick={handleClick}>
            🔎
          </button>
        </div>
        <div className='filters_box'>
          <h4>Filter for:</h4>
          <select className='filters' name="Filters" id="Filters" value={selectedParam} onChange={handleChange}>
            {/* Opzioni per i diversi filtri */}
            <option value="query">Recipes</option>
            <option value="cuisine">Cuisine</option>
            <option value="intolerances">Intolerances</option>
            <option value="includeIngredients">Include Ingredients (with comma)</option>
            <option value="excludeIngredients">Exclude Ingredients (with comma)</option>
            <option value="author">Author</option>
            <option value="recipeBoxId">Recipe Box ID</option>
            <option value="maxReadyTime">Max Ready Time</option>
          </select>
        </div>
        <h3>Over 5000+ of recipes to choose from</h3>
      </div>
      <div className='carousel_container'>
        <div className='carousel_slider'>
          {/* Rendering delle immagini del carousel */}
          {carouselImages.map((item) => (
            <img key={item.id} className='carousel_image' src={item.image} alt={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
