import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY


export default function Home() {

  const navigate= useNavigate();
  const [search, setSearch] = React.useState("")
  const [resultsArray, setResultsArray] = React.useState([])

  function handleChange(event) {
    setSearch(event.target.value)
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
            },
          }
        );


        const results = response.data.results;
        console.log(results)
        setResultsArray(results)

        navigate('/results', { state: { results } });
      } else {
        alert('Write something');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }




  return (
    <div className='main_div'>
      <div className='home_div'>
        <h1>Search your Veggie recipes!</h1>
        <div className='search_bar_box'>

          <input className='search_bar'
            name='search_recipe'
            type="text"
            placeholder='Search...'
            value={search}
            onChange={handleChange} />

          <button className='search_button'
            onClick={handleClick}>🔎</button>
        </div>
        <h3>Over thousands of recipes to choose from</h3>
      </div>
    </div>
  )
}