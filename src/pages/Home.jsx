import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearch, setCarouselImages, setResultsArray, selectSearch, selectCarouselImages, selectApiKey } from '../redux/slice';
import axios from 'axios';
import testData from '../testData.json';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector(selectSearch);
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

        navigate(`/results/${encodeURIComponent(search)}`);
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
        <h1>
          Search your <span>Veggie</span> recipes!📖
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
        <h3>Over 1000+ of recipes to choose from</h3>
      </div>
      <div className='carousel_container'>
        <div className='carousel_slider'>
          {testData.results.map((item) => (
            <img key={item.id} className='carousel_image' src={item.image} alt={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
