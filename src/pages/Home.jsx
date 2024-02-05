import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearch, setSelectedParam, setCarouselImages, setResultsArray, selectSearch, selectCarouselImages, selectApiKey, selectSelectedParam } from '../redux/slice';
import axios from 'axios';
import './Home.css'

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector(selectSearch);
  const selectedParam = useSelector(selectSelectedParam);
  const carouselImages = useSelector(selectCarouselImages);
  const apiKey = useSelector(selectApiKey);


  // useEffect(() => {
  //   async function fetchCarouselImages() {
  //     try {
  //       const response = await axios.get(
  //         `https://api.spoonacular.com/recipes/complexSearch`,
  //         {
  //           params: {
  //             apiKey: apiKey,
  //             diet: 'vegetarian',
  //             number: 100,
  //           },
  //         }
  //       );

  //       const carouselResults = response.data.results;
  //       dispatch(setCarouselImages(carouselResults));
  //     } catch (error) {
  //       console.error('Error fetching carousel images:', error.message);
  //     }
  //   }

  //   fetchCarouselImages();

  // }, [apiKey, dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;

    if(name === 'search_recipe'){
      dispatch(setSearch(value));
    } else if (name === 'Filters'){
      dispatch(setSelectedParam(value));
    }
  }



  async function handleClick() {
    try {
      if (search.trim() !== '') {

        const params = {
          apiKey: apiKey,
          diet: 'vegetarian',
          number: 40,
        };

        params[selectedParam] = search;

      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        { params: params }
      );

        const results = response.data.results;
        console.log(results);
        dispatch(setResultsArray(results));

        navigate(`/results/${encodeURIComponent(search)}`);
      } 
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

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
                handleClick();
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
        <h3>Over 1000+ of recipes to choose from</h3>
      </div>
      <div className='carousel_container'>
        <div className='carousel_slider'>
          {carouselImages.map((item) => (
            <img key={item.id} className='carousel_image' src={item.image} alt={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
