import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetails, getFavoriteIds, saveFavorite } from '../services/functions';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareImg from '../images/shareIcon.svg';
import StartRecipe from './StartRecipe';
import FoodVideo from './FoodVideo';
import Recommendation from './Recommendation';
import IngredientsMap from './IngredientsMaps';

const FoodDetails = ({ match }) => {
  const { path } = match;
  const mealId = match.params.id;
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});

  const getIngredients = (thisMeal) => {
    setIngredients(Object.keys(thisMeal).filter((item) => item.includes('Ingredient')));
    setMeasures(Object.keys(thisMeal).filter((item) => item.includes('Measure')));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${mealId}`);
    setLinkCopied(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const info = {
      category: meal[0].strCategory,
      nationality: meal[0].strArea,
      id: mealId,
      type: 'food',
      alcoholicOrNot: '',
      name: meal[0].strMeal,
      image: meal[0].strMealThumb,
    };
    saveFavorite(info);
  };

  useEffect(() => {
    fetchDetails(mealId, 'meal').then((data) => {
      setMeal(data);
      getIngredients(data[0]);
      setLoading(false);
    });
    setIsFavorite(getFavoriteIds().some((id) => id === mealId));
  }, [mealId]);

  return (
    loading ? <h2>Carregando...</h2> : (
      <div className="details-container">
        {linkCopied && <h5>Link copied!</h5>}
        <img
          data-testid="recipe-photo"
          src={ meal[0].strMealThumb }
          alt={ meal[0].strMeal }
          className="detail-img"
        />
        <div className="details-info">
          <h4 data-testid="recipe-title">{meal[0].strMeal}</h4>
          <button
            type="button"
            onClick={ handleShare }
            className="pointer"
            data-testid="share-btn"
          >
            <img
              src={ shareImg }
              alt="share icon"
              className="share-img"
            />
          </button>
          <button
            type="button"
            onClick={ handleFavorite }
            className="pointer"
          >
            <img
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="heart"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{meal[0].strCategory}</p>
        </div>
        <IngredientsMap
          ingredients={ ingredients }
          measures={ measures }
          recipe={ meal[0] }
          recipeId={ mealId }
          path={ path }
        />
        <p className="instructions" data-testid="instructions">
          {meal[0].strInstructions}
        </p>
        <FoodVideo meal={ meal[0] } />
        <Recommendation path={ path } />
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
