import React from 'react';
import Proptypes from 'prop-types';

function StartRecipe({ id }) {
  const buttonName = () => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(doneRecipe);
    const isDone = doneRecipe?.some((data) => data.id === id);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let isInProgress = false;
    if (inProgress?.cocktails) {
      isInProgress = Object.keys(inProgress.cocktails).some((data) => data === id);
    }
    if (inProgress?.meals) {
      isInProgress = isInProgress
        || Object.keys(inProgress.meals).some((data) => data === id);
    }
    if (isInProgress) {
      return 'Continue Recipe';
    } if (isDone) {
      return '';
    } return 'Start Recipe';
  };
  return (
    <button
      type="button"
      className="start-recipe"
      data-testid="start-recipe-btn"
    >
      {buttonName()}
    </button>
  );
}

StartRecipe.propTypes = {
  id: Proptypes.string.isRequired,
};

export default StartRecipe;
