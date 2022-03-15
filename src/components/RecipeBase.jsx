import React from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function RecipeBase(props) {
  const {
    path,
    linkCopied,
    ingredients,
    measures,
    handleShare,
    handleFavorite,
    meal,
    isFavorite,
  } = props;
  return (
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
          data-testid="share-btn"
        >
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
        <p data-testid="recipe-category">{meal[0].strCategory}</p>
      </div>
      <ul className="ingredients-ul">
        {
          ingredients.map((ingredient, index) => (
            meal[0][ingredient] ? (
              <li
                key={ index }
                data-testid={
                  path === '/foods/:id/in-progress'
                    ? `${index}-ingredient-step`
                    : `${index}-ingredient-name-and-measure`
                }
              >
                {
                  path === '/foods/:id/in-progress' ? (
                    <label htmlFor={ `ingrediente-${index}` }>
                      <input type="checkbox" id={ `ingrediente-${index}` } />
                      {` - ${meal[0][measures[index]]} - ${meal[0][ingredient]}`}
                    </label>
                  )
                    : `${meal[0][measures[index]]} - ${meal[0][ingredient]}`
                }
              </li>)
              : ''
          ))
        }
      </ul>
      <p className="instructions" data-testid="instructions">
        {meal[0].strInstructions}
      </p>
    </div>
  );
}

RecipeBase.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default RecipeBase;
