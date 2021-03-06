import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetails, getFavoriteIds, saveFavorite } from '../services/functions';
import StartRecipe from './StartRecipe';
import Recommendation from './Recommendation';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareImg from '../images/shareIcon.svg';
import IngredientsMap from './IngredientsMap';
import AppContext from '../context/AppContext';

const DrinkDetails = ({ match }) => {
  const { finishButton } = useContext(AppContext);
  const { path } = match;
  const drinkId = match.params.id;
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});

  const getIngredients = (thisDrink) => {
    setIngredients(Object.entries(thisDrink)
      .filter((item) => item[0].includes('Ingredient') && item[1]));
    setMeasures(Object.keys(thisDrink).filter((item) => item.includes('Measure')));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${drinkId}`);
    setLinkCopied(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const info = {
      category: drink[0].strCategory,
      nationality: '',
      id: drinkId,
      type: 'drink',
      alcoholicOrNot: drink[0].strAlcoholic,
      name: drink[0].strDrink,
      image: drink[0].strDrinkThumb };
    saveFavorite(info);
  };

  useEffect(() => {
    fetchDetails(drinkId, 'cocktail').then((data) => {
      setDrink(data);
      getIngredients(data[0]);
      setLoading(false);
    });
    setIsFavorite(getFavoriteIds().some((id) => id === drinkId));
  }, [drinkId]);

  return (
    loading ? <h2>Carregando...</h2> : (
      <div className="details-container">
        { linkCopied && <h5>Link copied!</h5> }
        <img
          data-testid="recipe-photo"
          src={ drink[0].strDrinkThumb }
          alt={ drink[0].strDrink }
          className="detail-img"
        />
        <div className="details-info">
          <h4 data-testid="recipe-title">{drink[0].strDrink}</h4>
          <button
            onClick={ handleShare }
            type="button"
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
          <p data-testid="recipe-category">{drink[0].strAlcoholic}</p>
        </div>
        {linkCopied && <h5>Link copied!</h5>}
        <IngredientsMap
          ingredients={ ingredients }
          measures={ measures }
          recipe={ drink[0] }
          recipeId={ drinkId }
          path={ path }
        />
        <p className="instructions" data-testid="instructions">
          {drink[0].strInstructions}
        </p>
        <Recommendation path={ path } />
        {path.includes('/in-progress') ? (
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="start-recipe bottom-btn"
              disabled={ !finishButton }
            >
              Finish Recipe
            </button>
          </Link>
        ) : (
          <Link to={ `/drinks/${drinkId}/in-progress` }>
            <StartRecipe id={ drinkId } />
          </Link>
        )}
      </div>
    )
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default DrinkDetails;
