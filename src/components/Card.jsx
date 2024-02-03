import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  return (
    <div className='card_container'>
      <img src={props.image} alt={props.alt} />
      <h3>～{props.title}～</h3>
      {/* Altri elementi del layout qui */}
    </div>
  );
}


Card.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // Aggiungi altre PropTypes secondo necessità
  };
