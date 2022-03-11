import React from 'react';
import PropTypes from 'prop-types';
import FoodDetails from './FoodDetails';

function FoodInProgress({ match }) {
  return (
    <div>
      <FoodDetails match={ match } />
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default FoodInProgress;
