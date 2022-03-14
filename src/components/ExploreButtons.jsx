import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRandomId } from '../services/functions';

function ExploreButtons({ isDrink }) {
  const { push } = useHistory();

  const handleClick = () => {
    getRandomId(isDrink).then((path) => push(path));
  };

  return (
    <nav className="explore-nav">
      <Link
        className="explore-btn"
        data-testid="explore-by-ingredient"
        to={ isDrink ? '/explore/drinks/ingredients' : '/explore/foods/ingredients' }
      >
        <h5>By Ingredient</h5>
      </Link>
      { !isDrink && (
        <Link
          className="explore-btn"
          data-testid="explore-by-nationality"
          to="/explore/foods/nationalities"
        >
          <h5>By Nationality</h5>
        </Link>
      )}
      <button className="explore-btn" type="button" onClick={ handleClick }>
        <h5 data-testid="explore-surprise">Surprise me!</h5>
      </button>
    </nav>
  );
}

ExploreButtons.propTypes = {
  isDrink: PropTypes.bool,
}.isRequired;

export default ExploreButtons;
