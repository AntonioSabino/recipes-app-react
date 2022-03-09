import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from '../services/functions';

const FoodDetails = ({ match }) => {
  const mealId = match.params.id;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});

  const getIngredients = (thisMeal) => {
    setIngredients(Object.keys(thisMeal).filter((item) => item.includes('Ingredient')));
    setMeasures(Object.keys(thisMeal).filter((item) => item.includes('Measure')));
  };

  useEffect(() => {
    fetchDetails(mealId, 'meal').then((data) => {
      setMeal(data);
      getIngredients(data[0]);
      setLoading(false);
    });
  }, [mealId]);

  console.log(meal[0]);

  return (
    loading ? <h2>Carregando...</h2>
      : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ meal[0].strMealThumb }
            alt={ meal[0].strMeal }
          />
          <h4 data-testid="recipe-title">{meal[0].strMeal}</h4>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <p data-testid="recipe-category">{meal[0].strCategory}</p>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${meal[0][measures[index]]} - ${meal[0][ingredient]}`}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{meal[0].strInstructions}</p>
          <iframe
            title={ meal[0].strYoutube }
            width={ 420 }
            height={ 315 }
            data-testid="video"
            src={ meal[0].strYoutube }
          />
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

FoodDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default FoodDetails;
