import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetails, getFavoriteIds } from '../services/functions';
import StartRecipe from './StartRecipe';
import RecipeBase from './RecipeBase';
import Recommendation from './Recommendation';

const DrinkDetails = ({ match }) => {
  const { path } = match;
  const drinkId = match.params.id;
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [measures, setMeasures] = useState({});

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

  return (
    loading ? <h2>Carregando...</h2> : (
      <div className="details-container">
        <RecipeBase
          path={ path }
          linkCopied={ linkCopied }
          ingredients={ ingredients }
          measures={ measures }
          handleShare={ handleShare }
          drink={ drink[0] }
          drinkId={ drinkId }
          isFavorite={ isFavorite }
          setIsFavorite={ setIsFavorite }
        />
        <Recommendation path={ path } />
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
