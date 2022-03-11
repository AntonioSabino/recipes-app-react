import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneCards() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const savedDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(savedDone || []);
  }, []);
  return (
    <section>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
          <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
            { recipe.tags[0] }
          </p>
          <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
            { recipe.tags[1] }
          </p>
          { recipe.type === 'food'
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.nationality }
                {' '}
                -
                {' '}
                { recipe.category }
              </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
            )}
        </div>
      ))}
    </section>
  );
}

export default DoneCards;
