import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetails, getFavoriteIds, saveFavorite } from '../services/functions';
import AppContext from '../context/AppContext';
import StartRecipe from './StartRecipe';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const DrinkDetails = ({ match }) => {
  const { path } = match;
  const drinkId = match.params.id;
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});
  const { recommendedMeals } = useContext(AppContext);

  const getIngredients = (thisDrink) => {
    setIngredients(Object.keys(thisDrink).filter((item) => item.includes('Ingredient')));
    setMeasures(Object.keys(thisDrink).filter((item) => item.includes('Measure')));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${drinkId}`);
    setLinkCopied(true);
  };

  useEffect(() => {
    fetchDetails(drinkId, 'cocktail').then((data) => {
      setDrink(data);
      getIngredients(data[0]);
      setLoading(false);
    });
    setIsFavorite(getFavoriteIds().some((id) => id === drinkId));
  }, [drinkId]);

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

  return (
    loading ? <h2>Carregando...</h2>
      : (
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
            <button onClick={ handleShare } type="button" data-testid="share-btn">
              Compartilhar
            </button>
            <button
              type="button"
              onClick={ handleFavorite }
            >
              <img
                src={ isFavorite ? blackHeart : whiteHeart }
                alt="heart"
                data-testid="favorite-btn"
              />
            </button>
            <p data-testid="recipe-category">{drink[0].strAlcoholic}</p>
          </div>
          <ul className="ingredients-ul">
            {
              ingredients.map((ingredient, index) => (
                drink[0][ingredient] ? (
                  <li
                    key={ index }
                    data-testid={
                      path === '/drinks/:id/in-progress'
                        ? `${index}-ingredient-step`
                        : `${index}-ingredient-name-and-measure`
                    }
                  >
                    {
                      path === '/drinks/:id/in-progress' ? (
                        <label htmlFor={ `ingrediente-${index}` }>
                          <input type="checkbox" id={ `ingrediente-${index}` } />
                          {` - ${drink[0][measures[index]]} - ${drink[0][ingredient]}`}
                        </label>
                      )
                        : `${drink[0][measures[index]]} - ${drink[0][ingredient]}`
                    }

                  </li>)
                  : ''
              ))
            }
          </ul>
          <p className="instructions" data-testid="instructions">
            {drink[0].strInstructions}
          </p>
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
          <Link to={ `/drinks/${drinkId}/in-progress` }>
            <StartRecipe id={ drinkId } />
          </Link>
        </div>
      )
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default DrinkDetails;
