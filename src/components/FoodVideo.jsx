import React from 'react';
import PropTypes from 'prop-types';
import { getEmbed } from '../services/functions';

function FoodVideo({ meal }) {
  return (
    <iframe
      title={ meal.strYoutube }
      width={ 405 }
      height={ 275 }
      data-testid="video"
      src={ getEmbed(meal.strYoutube) }
    />
  );
}

FoodVideo.propTypes = {
  meal: PropTypes.array,
}.isRequired;

export default FoodVideo;
