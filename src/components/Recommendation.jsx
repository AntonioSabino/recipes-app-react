import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Recommendation({ path }) {
  const { recommendedDrinks, recommendedMeals } = useContext(AppContext);

  return (
    path.includes('/foods') ? (
      <ul className="recommended-carrocel">
        {
          recommendedDrinks.map((drink, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                alt={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />
              <h4 data-testid={ `${index}-recomendation-title` }>
                {drink.strDrink}
              </h4>
            </li>
          ))
        }
      </ul>
    ) : (
      <ul className="recommended-carrocel">
        {
          recommendedMeals.map((meal, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                alt={ meal.strMeal }
                src={ meal.strMealThumb }
              />
              <h4 data-testid={ `${index}-recomendation-title` }>
                { meal.strMeal }
              </h4>
            </li>
          ))
        }
      </ul>
    )
  );
}

Recommendation.propTypes = {
  path: PropTypes.string,
}.isRequired;

export default Recommendation;
