import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from '../services/functions';
import AppContext from '../context/AppContext';
import StartRecipe from './StartRecipe';

const DrinkDetails = ({ match }) => {
  const drinkId = match.params.id;
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});
  const { recommendedMeals } = useContext(AppContext);

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

  console.log(recommendedMeals);

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
          <StartRecipe />
        </div>
      )
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default DrinkDetails;
