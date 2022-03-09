import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from '../services/functions';

const DrinkDetails = ({ match }) => {
  const drinkId = match.params.id;
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});

  const getIngredients = (thisDrink) => {
    setIngredients(Object.keys(thisDrink).filter((item) => item.includes('Ingredient')));
    setMeasures(Object.keys(thisDrink).filter((item) => item.includes('Measure')));
  };

  useEffect(() => {
    fetchDetails(drinkId, 'cocktail').then((data) => {
      setDrink(data);
      getIngredients(data[0]);
      setLoading(false);
    });
  }, [drinkId]);

  console.log(drink);

  return (
    loading ? <h2>Carregando...</h2>
      : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ drink[0].strDrinkThumb }
            alt={ drink[0].strDrink }
          />
          <h4 data-testid="recipe-title">{drink[0].strDrink}</h4>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <p data-testid="recipe-category">{drink[0].strAlcoholic}</p>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                drink[0][ingredient] ? (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${drink[0][measures[index]]} - ${drink[0][ingredient]}`}
                  </li>)
                  : ''
              ))
            }
          </ul>
          <p data-testid="instructions">{drink[0].strInstructions}</p>
          <ul>
            <li
              data-testid="0-recomendation-card"
            >
              Receitas Recomendadas
            </li>
          </ul>
          <button type="button" data-testid="start-recipe-btn">
            Iniciar Receita
          </button>
        </div>
      )
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default DrinkDetails;
