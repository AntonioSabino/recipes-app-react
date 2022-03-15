import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  fetchDetails,
  getFavoriteIds,
  saveFavorite,
} from '../services/functions';
import StartRecipe from './StartRecipe';
import RecipeBase from './RecipeBase';
import FoodVideo from './FoodVideo';
import Recommendation from './Recommendation';

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

  useEffect(() => {
    fetchDetails(mealId, 'meal').then((data) => {
      setMeal(data);
      getIngredients(data[0]);
      setLoading(false);
    });
    setIsFavorite(getFavoriteIds().some((id) => id === mealId));
  }, [mealId]);

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

  return (
    loading ? <h2>Carregando...</h2> : (
      <div className="details-container">
        <RecipeBase
          path={ path }
          linkCopied={ linkCopied }
          ingredients={ ingredients }
          measures={ measures }
          handleShare={ handleShare }
          handleFavorite={ handleFavorite }
          meal={ meal }
          isFavorite={ isFavorite }
        />
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
