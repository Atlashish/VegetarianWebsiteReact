import { useEffect } from 'react'; 
import { useSelector, useDispatch} from 'react-redux';
import { selectDescriptionResults, selectApiKey, setResultsArray, setDescriptionId, setDescriptionResults } from '../redux/slice';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function Description(){
    const results = useSelector(selectDescriptionResults);
    const apiKey = useSelector(selectApiKey);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchDescription() {
            try {
              const id = decodeURIComponent(location.pathname.split('/description/')[1]);
              const response = await axios.get (
                `https://api.spoonacular.com/recipes/${id}/information`,
                {
                  params: {
                    apiKey: apiKey,
                  },
                }
              );

              const results = response.data;
              dispatch(setDescriptionResults(results))
            } catch (error) {
              console.error('Error fetching data:', error.message);
          }}

        fetchDescription()
    },[apiKey, dispatch])
    

    const convertHtmlString = (htmlString) => {
        return { __html: htmlString };
      };

    return(
        <div>
        <Navbar />
        <div className='description_container'>
            <h1>{results.title}</h1>
            <img src={results.image} alt={results.title} />
            <p dangerouslySetInnerHTML={convertHtmlString(results.summary)}></p>
            <br />
            <p dangerouslySetInnerHTML={convertHtmlString(results.instructions)}></p>
        </div>
        </div>
    )
}