import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRecipeIng } from '../services/functions';
import { DRINK_ING_URL, MEAL_ING_URL } from '../services/consts';

function IngredientButtons({ isDrink }) {
  const [ingredients, setIngredients] = useState([]);
  const initialUrl = isDrink ? DRINK_ING_URL : MEAL_ING_URL;
  const finalUrl = '-Small.png';

  useEffect(() => {
    getRecipeIng(isDrink).then((data) => setIngredients(data));
  }, [isDrink]);

  return (
    <nav className="explore-nav">
      { ingredients.map((name, index) => (
        <button
          data-testid={ `${index}-ingredient-card` }
          key={ `${index}-card` }
          type="button"
        >
          <img
            data-testid={ String(index).concat('-card-img') }
            alt="recipe"
            src={ `${initialUrl}${name}${finalUrl}` }
          />
          <h4 data-testid={ String(index).concat('-card-name') }>
            { name }
          </h4>
        </button>
      ))}
    </nav>
  );
}

IngredientButtons.propTypes = {
  isDrink: PropTypes.bool,
}.isRequired;

export default IngredientButtons;
