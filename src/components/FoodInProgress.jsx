import React from 'react';
import PropTypes from 'prop-types';
import FoodDetails from './FoodDetails';

function FoodInProgress({ match }) {
  return (
    <div>
      <FoodDetails match={ match } />
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default FoodInProgress;
