import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

function DoneCards() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const { doneFilter } = useContext(AppContext);

  const handleFilter = (recipe) => recipe.type === doneFilter || doneFilter === 'All';

  useEffect(() => {
    const savedDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(savedDone || []);
  }, []);

  const handleShare = ({ id, type }) => {
    if (type === 'drink') {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
      setLinkCopied(true);
    } navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setLinkCopied(true);
  };

  return (
    <section>
      { linkCopied && <h5>Link copied!</h5> }
      {doneRecipes.filter(handleFilter).map((recipe, index) => (
        <div key={ recipe.id }>

          { recipe.type === 'food'
            ? (
              <Link to={ `/foods/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </Link>)
            : (
              <Link to={ `/drinks/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </Link>)}

          <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>

          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <button
            type="button"
            onClick={ () => handleShare(recipe) }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
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
