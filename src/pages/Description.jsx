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
  window.scrollTo(0, 0);

  useEffect(() => {
    async function fetchDescription() {
      try {
        const id = decodeURIComponent(location.pathname.split('/description/')[1]);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: apiKey,
            },
          }
        );


        const results = response.data;
        dispatch(setDescriptionResults(results))
        console.log(results)
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchDescription()
  }, [apiKey, dispatch])


  const convertHtmlString = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div>
      <Navbar />
      <div className='main_container'>
        <div className='description_container'>
          <div className='description_image'>
            <img src={results.image} alt={results.title} />
          </div>
          <div className='description_text'>
            <h1>～{results.title}～
              <span>
                (Ready in {results.readyInMinutes} minutes)
              </span>
              {results.vegetarian &&<img  src="../vegetarian-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />} 
              {results.vegan &&<img  src="../vegan-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} />}
              {results.veryHealthy &&<img  src="../heart-care-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} /> }
              {results.sustainable &&<img  src="../environment-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} /> }
              {results.glutenFree &&<img  src="../gluten-free-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} /> }
              {results.dairyFree &&<img  src="../dairy-free-product-icon.png" alt="vegetarian-icon" style={{ width: '1.7rem', marginLeft: '0.5rem' }} /> }
            </h1>
            <br />
            <p dangerouslySetInnerHTML={convertHtmlString(results.summary)}></p>
          </div>
        </div>
        <hr className='horizontal_line' />
        <br />
        <div className='description_ingredients'>
          <h2>INGREDIENTS</h2>
          <ol>
            {results.extendedIngredients &&
              results.extendedIngredients.map((item) => (
                <li className='list_ingredients' key={item.id}> <strong>{item.aisle && `${item.aisle}:`}</strong>  {item.original}</li>
              ))}
            <br />
          </ol>
        </div>
        <hr className='horizontal_line' />
        <br />
        <div className='description_instructions'>
          <h2>INSTRUCTIONS</h2>
          <p dangerouslySetInnerHTML={convertHtmlString(results.instructions)}></p>
        </div>
        <br />
      </div>
    </div>
  )
}