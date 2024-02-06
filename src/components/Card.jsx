import PropTypes from 'prop-types'; // Importa PropTypes per la definizione dei tipi dei props
import './Card.css'; // Importa lo stile CSS per la componente Card

// Definizione e esportazione della componente Card
export default function Card(props) {
  return (
    <div className='card_container'> {/* Contenitore della card */}
      <img src={props.image} alt={props.alt} /> {/* Immagine della card */}
      <h3>～{props.title}～</h3> {/* Titolo della card */}
    </div>
  );
}

// Definizione dei tipi dei props utilizzando PropTypes
Card.propTypes = {
  image: PropTypes.string.isRequired, // Prop "image" di tipo stringa, obbligatorio
  alt: PropTypes.string.isRequired, // Prop "alt" di tipo stringa, obbligatorio
  title: PropTypes.string.isRequired, // Prop "title" di tipo stringa, obbligatorio
};
