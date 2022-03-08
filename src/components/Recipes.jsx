import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { MAX_RECIPES } from '../services/consts';

function Recipes({ isDrink }) {
  const { data } = useContext(AppContext);
  return (
    data.filter((_meal, index) => index < MAX_RECIPES)
      .map((meal, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            alt="recipe"
            src={ isDrink ? meal.strDrinkThumb : meal.strMealThumb }
          />
          <h4 data-testid={ `${index}-card-name` }>
            { isDrink ? meal.strDrink : meal.strMeal }
          </h4>
        </div>
      ))
  );
}

Recipes.propTypes = {
  isDrink: PropTypes.bool.isRequired,
};

export default Recipes;
