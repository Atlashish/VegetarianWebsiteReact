import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setResultsArray, selectSearch, selectApiKey, clearDescriptionResults } from '../redux/slice';
import './Navbar.css'

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
                  diet: 'vegetarian',
                  query: search,
                  number: 40,
                },
              }
            );
    
            const results = response.data.results;
            console.log(results);
            dispatch(setResultsArray(results));
    
            navigate(`/results/${search}`);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }

      function goBack(){
        dispatch(clearDescriptionResults());
        navigate(-1);

      }


    return (
        <nav className='navbar'>
            <button className='button_navbar' 
            onClick={goBack}>
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