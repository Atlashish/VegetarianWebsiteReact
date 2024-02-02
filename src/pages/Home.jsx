import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import testData from '../testData.json'

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY


export default function Home() {

  const navigate = useNavigate();
  const [search, setSearch] = React.useState("")
  const [resultsArray, setResultsArray] = React.useState([])
  const [carouselImages, setCarouselImages] = React.useState([])

  function handleChange(event) {
    setSearch(event.target.value)
  }

  async function handleClick() {
    try {
      if (search.trim() !== '' ) {
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
        console.log(results)
        setResultsArray(results)

        navigate(`/results/${search}`, { state: { results } });
      } else {
        alert('Write something');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // React.useEffect(() => {
  //   async function fetchCarouselImages() {
  //     try {
  //       const response = await axios.get(
  //         `https://api.spoonacular.com/recipes/complexSearch`,
  //         {
  //           params: {
  //             apiKey: apiKey,
  //             number: 100
  //           },
  //         }
  //       );

  //       const carouselResults = response.data.results
  //       setCarouselImages(carouselResults)

  //       console.log(carouselResults)



  //     } catch (error) {
  //       console.error('Error fetching carousel images:', error.message);
  //     }
  //   }

  //   fetchCarouselImages();

  // }, []);



  return (
    <div className='main_div'>
      <div className='home_div'>
        <h1>Search your  <span>Veggie</span> recipes!📖</h1>
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
        <h3>Over 1000+ of recipes to choose from</h3>
      </div>
      <div className='carousel_container'>
        <div className='carousel_slider' >
          {testData.results.map((item) => (
              <img key={item.id} className='carousel_image'  src={item.image} alt={item.title}/>
          ))}
        </div>
      </div>
    </div>
  )
}