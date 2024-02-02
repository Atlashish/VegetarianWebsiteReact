import react from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Description(){
    const location = useLocation();
    const results = location.state.results;

    console.log(results)

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