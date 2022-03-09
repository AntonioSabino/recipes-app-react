import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function DrinkRecipes() {
  const { isLoading, dataDrinks } = useContext(AppContext);

  return (
    isLoading ? <h2>Carregando...</h2>
      : dataDrinks.map((drink, index) => (
        <Link
          to={ `/drinks/${drink.idDrink}` }
          data-testid={ String(index).concat('-recipe-card') }
          key={ String(index).concat('-recipe-card') }
        >
          <img
            data-testid={ String(index).concat('-card-img') }
            alt="recipe"
            src={ drink.strDrinkThumb }
          />
          <h4 data-testid={ String(index).concat('-card-name') }>
            { drink.strDrink }
          </h4>
        </Link>
      ))
  );
}

export default DrinkRecipes;
