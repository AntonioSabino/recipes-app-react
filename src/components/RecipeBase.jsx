import React from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareImg from '../images/shareIcon.svg';
import { saveFavorite } from '../services/functions';

function RecipeBase(props) {
  const {
    path,
    linkCopied,
    ingredients,
    measures,
    handleShare,
    meal,
    mealId,
    drink,
    drinkId,
    isFavorite,
    setIsFavorite,
  } = props;

  const str = path.includes('/foods') ? 'Meal' : 'Drink';
  const recipe = path.includes('/foods') ? meal : drink;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (path.includes('/foods')) {
      const info = {
        category: meal.strCategory,
        nationality: meal.strArea,
        id: mealId,
        type: 'food',
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      saveFavorite(info);
    } else {
      const info = {
        category: drink.strCategory,
        nationality: '',
        id: drinkId,
        type: 'drink',
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb };
      saveFavorite(info);
    }
  };

  return (
    <div className="details-container">
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${str}Thumb`] }
        alt={ recipe[`str${str}`] }
        className="detail-img"
      />
      <div className="details-info">
        <h4 data-testid="recipe-title">{recipe[`str${str}`]}</h4>
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
        <p data-testid="recipe-category">
          {
            path.includes('/foods')
              ? recipe.strCategory
              : recipe.strAlcoholic
          }
        </p>
      </div>
      {linkCopied && <h5>Link copied!</h5>}
      <h3>Ingredients</h3>
      <ul className="ingredients-ul">
        {
          ingredients.map((ingredient, index) => (
            recipe[ingredient] && (
              <li
                key={ index }
                data-testid={
                  path.includes('/in-progress')
                    ? `${index}-ingredient-step`
                    : `${index}-ingredient-name-and-measure`
                }
              >
                {
                  path.includes('/in-progress') ? (
                    <label htmlFor={ `ingrediente-${index}` }>
                      <input type="checkbox" id={ `ingrediente-${index}` } />
                      {` - ${recipe[measures[index]]} - ${recipe[ingredient]}`}
                    </label>
                  )
                    : `${recipe[measures[index]]} - ${recipe[ingredient]}`
                }
              </li>)
          ))
        }
      </ul>
      <h3>Instructions</h3>
      <p className="instructions" data-testid="instructions">
        {recipe.strInstructions}
      </p>
    </div>
  );
}

RecipeBase.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default RecipeBase;
