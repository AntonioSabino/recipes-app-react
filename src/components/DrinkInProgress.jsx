import React from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from './DrinkDetails';

function DrinkInProgress({ match }) {
  return (
    <div>
      <DrinkDetails match={ match } />
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default DrinkInProgress;
