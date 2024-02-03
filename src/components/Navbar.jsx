import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCarouselImages, setResultsArray, selectSearch, selectCarouselImages, selectApiKey } from '../redux/slice';
export default function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiKey = useSelector(selectApiKey);
    const search = useSelector(selectSearch);

    function handleChange(event) {
        dispatch(setSearch(event.target.value));
      }

      async function handleClick() {
        try {
          if (search.trim() !== '') {
            const response = await axios.get(
              `https://api.spoonacular.com/recipes/complexSearch`,
              {
                params: {
                  apiKey: apiKey,
                  query: search,
                  number: 40,
                },
              }
            );
    
            const results = response.data.results;
            console.log(results);
            dispatch(setResultsArray(results));
    
            navigate(`/results/${search}`);
          } else {
            alert('Write something');
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }

//    async function randomRecipe(){
//     try{
//         const response = axios.get(
//             'https://api.spoonacular.com/recipes/random',
//             {
//                 params: {
//                     apiKey: apiKey,
//                     number: 1
//                 }
//             }
//         )

//         const results = response.data;
//         dispatch(setResultsArray(results))
        
//         navigate('/results/random');

//     } catch(error){
//         console.error('Error fetching data:', error.message);
//     }
//    }


    return (
        <nav className='navbar'>
            <button className='button_navbar' 
            onClick={() => navigate(-1)}>
              <span> ◀ Go Back</span>
              </button>
            <div className='search_bar_box_navbar'>
          <input
            className='search_bar_navbar'
            name='search_recipe'
            type='text'
            placeholder='Search...'
            value={search}
            onChange={handleChange}
          />
          <button className='search_button_navbar' 
          onClick={handleClick}>
            🔎
          </button>
        </div>
            <div>
            <button className='button_navbar'
             onClick={() => navigate('/')}>
             <span>Home</span>
              </button>
            {/* <button className='button_random_recipes' onClick={randomRecipes}>Random Recipe</button> */}
            </div>
        </nav>
    )
}