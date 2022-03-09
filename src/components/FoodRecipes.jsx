import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function FoodRecipes() {
  const { isLoading, dataMeals } = useContext(AppContext);

  return (
    isLoading ? <h2>Carregando...</h2>
      : dataMeals.map((meal, index) => (
        <Link
          to={ `/foods/${meal.idMeal}` }
          data-testid={ String(index).concat('-recipe-card') }
          key={ String(index).concat('-recipe-card') }
        >
          <img
            data-testid={ String(index).concat('-card-img') }
            alt="recipe"
            src={ meal.strMealThumb }
          />
          <h4 data-testid={ String(index).concat('-card-name') }>
            { meal.strMeal }
          </h4>
        </Link>
      ))
  );
}

export default FoodRecipes;
