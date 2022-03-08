import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { MAX_RECIPES } from '../services/consts';

function Recipes() {
  const { data } = useContext(AppContext);
  return (
    data.filter((_meal, index) => index < MAX_RECIPES)
      .map((_meal, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ `${index}-recipe-card` }
        >
          <div data-testid={ `${index}-card-img` }>b</div>
          <div data-testid={ `${index}-card-name` }>c</div>
        </div>
      ))
  );
}

export default Recipes;
