import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Recipes({ isDrink, data }) {
  const { isLoading } = useContext(AppContext);

  return (
    isLoading ? <h2>Carregando...</h2>
      : data.map((meal, index) => (
        <Link
          to={ isDrink ? `/drinks/${meal.idDrink}` : `/foods/${meal.idMeal}` }
          data-testid={ String(index).concat('-recipe-card') }
          key={ String(index).concat('-recipe-card') }
        >
          <img
            data-testid={ String(index).concat('-card-img') }
            alt="recipe"
            src={ isDrink ? meal.strDrinkThumb : meal.strMealThumb }
          />
          <h4 data-testid={ String(index).concat('-card-name') }>
            { isDrink ? meal.strDrink : meal.strMeal }
          </h4>
        </Link>
      ))
  );
}

Recipes.propTypes = {
  isDrink: PropTypes.bool,
}.isRequired;

Recipes.defaultProps = {
  data: [],
};

export default Recipes;
