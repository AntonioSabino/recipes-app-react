import React, { useEffect, useState } from 'react';

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
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            Compartilhar
          </button>
          <p data-testid={ `${index}-${recipe.tags}-horizontal-done-date` }>Tag1</p>
        </div>
      ))}
    </section>
  );
}

export default DoneCards;
