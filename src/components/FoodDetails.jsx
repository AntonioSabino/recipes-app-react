import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetails, getFavoriteIds } from '../services/functions';
import AppContext from '../context/AppContext';
import StartRecipe from './StartRecipe';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FoodDetails = ({ match }) => {
  const mealId = match.params.id;
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});
  const { recommendedDrinks } = useContext(AppContext);

  const getIngredients = (thisMeal) => {
    setIngredients(Object.keys(thisMeal).filter((item) => item.includes('Ingredient')));
    setMeasures(Object.keys(thisMeal).filter((item) => item.includes('Measure')));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${mealId}`);
    setLinkCopied(true);
  };

  useEffect(() => {
    fetchDetails(mealId, 'meal').then((data) => {
      setMeal(data);
      getIngredients(data[0]);
      setLoading(false);
    });
    setIsFavorite(getFavoriteIds().some((id) => id === mealId));
  }, [mealId]);

  console.log(recommendedDrinks);

  return (
    loading ? <h2>Carregando...</h2>
      : (
        <div>
          { linkCopied && <h5>Link copied!</h5> }
          <img
            data-testid="recipe-photo"
            src={ meal[0].strMealThumb }
            alt={ meal[0].strMeal }
          />
          <h4 data-testid="recipe-title">{meal[0].strMeal}</h4>
          <button
            type="button"
            onClick={ handleShare }
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <button
            type="button"
            onClick={ () => setIsFavorite(!isFavorite) }
          >
            <img
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="heart"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{meal[0].strCategory}</p>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                meal[0][ingredient] ? (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${meal[0][measures[index]]} - ${meal[0][ingredient]}`}
                  </li>)
                  : ''
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
                    { drink.strDrink }
                  </h4>
                </li>
              ))
            }
          </ul>
          <Link to={ `/foods/${mealId}/in-progress` }>
            <StartRecipe id={ mealId } />

          </Link>

        </div>
      )
  );
};

FoodDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default FoodDetails;
