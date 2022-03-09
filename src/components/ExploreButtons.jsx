import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ExploreButtons({ isDrink }) {
  return (
    <nav className="explore-nav">
      <Link
        data-testid="explore-by-ingredient"
        to={ isDrink ? '/explore/drinks/ingredients' : '/explore/foods/ingredients' }
      >
        <h5>By Ingredient</h5>
      </Link>
      { !isDrink && (
        <Link data-testid="explore-by-nationality" to="/explore/foods/nationalities">
          <h5>By Nationality</h5>
        </Link>
      )}
      <div>
        <h5 data-testid="explore-surprise">Surprise me!</h5>
      </div>
    </nav>
  );
}

ExploreButtons.propTypes = {
  isDrink: PropTypes.bool,
}.isRequired;

export default ExploreButtons;
