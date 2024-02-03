import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDescriptionResults, selectApiKey, setDescriptionResults } from '../redux/slice';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function Description() {
  const results = useSelector(selectDescriptionResults);
  const apiKey = useSelector(selectApiKey);
  const dispatch = useDispatch();

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
      <div className='description_container'>
        <div className='left_container'>
          <img src={results.image} alt={results.title} />
        </div>
        <div className='right_container'>
          <div className='title_container'>
            <h1>{results.title}</h1>
            <p dangerouslySetInnerHTML={convertHtmlString(results.summary)}></p>
          </div>
          <div className='ingredients_container'>
            <ul>
              {results.extendedIngredients &&
                results.extendedIngredients.map((item) => (
                  <li key={item.id}>{item.aisle && `${item.aisle}:`} {item.original}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <br />
      <p dangerouslySetInnerHTML={convertHtmlString(results.instructions)}></p>

    </div>
  )
}