import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { filterByIng, getRecipeIng } from '../services/functions';
import { DRINK_ING_URL, MEAL_ING_URL } from '../services/consts';
import AppContext from '../context/AppContext';

function IngredientButtons({ isDrink }) {
  const { setDataMeals, setDataDrinks } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const { push } = useHistory();
  const initialUrl = isDrink ? DRINK_ING_URL : MEAL_ING_URL;
  const finalUrl = '-Small.png';

  useEffect(() => {
    getRecipeIng(isDrink).then((data) => setIngredients(data));
  }, [isDrink]);

  const handleClick = (ingredient) => {
    if (isDrink) {
      filterByIng(ingredient, isDrink).then((drinks) => {
        setDataDrinks(drinks);
        push('/drinks');
      });
    } else {
      filterByIng(ingredient).then((meals) => {
        setDataMeals(meals);
        push('/foods');
      });
    }
  };

  return (
    <nav className="explore-nav">
      { ingredients.map((name, index) => (
        <button
          data-testid={ `${index}-ingredient-card` }
          key={ `${index}-card` }
          type="button"
          onClick={ () => handleClick(name) }
          className="ingredient-btn"
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

// quando inDrink é verdadeiro, são exibidos ingredientes de bebidas,
// quando inDrink é falso, são exibidos ingredientes de comidas,

IngredientButtons.propTypes = {
  isDrink: PropTypes.bool,
}.isRequired;

export default IngredientButtons;
