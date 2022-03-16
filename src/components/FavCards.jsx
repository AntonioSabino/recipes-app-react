import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

function FavCards() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const { doneFilter } = useContext(AppContext);

  const handleFilter = (recipe) => recipe.type === doneFilter || doneFilter === 'All';

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(data || []);
  }, []);

  const handleFavorite = ({ id }) => {
    setFavRecipes((prevFav) => prevFav.filter((recipe) => recipe.id !== id));
    removeFavorite(id);
  };

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
      {favRecipes.filter(handleFilter).map((recipe, index) => (
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
          <button
            type="button"
            onClick={ () => handleFavorite(recipe) }
          >
            <img
              src={ blackHeart }
              alt="heart"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
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

export default FavCards;
