import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCheckedIngredients, saveChecked } from '../services/functions';

function IngredientsMap({ ingredients, measures, recipe, path, recipeId }) {
  const [isCheked, setIsCheked] = useState(
    new Array(ingredients.length).fill(false),
  );

  console.log(ingredients.length);

  const handleChange = (position) => {
    const updatedChecked = isCheked.map(
      (item, index) => (index === position ? !item : item),
    );
    const storageData = {
      id: recipeId,
      checked: updatedChecked,
    };
    setIsCheked(updatedChecked);
    saveChecked(storageData, recipeId, path);
  };

  useEffect(() => {
    const newChecked = getCheckedIngredients(recipeId, path);
    if (newChecked.length) {
      console.log(newChecked[0].checked);
      setIsCheked(newChecked[0].checked);
    }
  }, [path, recipeId, setIsCheked]);

  return (
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
                    <input
                      type="checkbox"
                      id={ `ingrediente-${index}` }
                      defaultChecked={ isCheked[index] }
                      onChange={ () => handleChange(index) }
                    />
                    {` - ${recipe[measures[index]]} - ${recipe[ingredient]}`}
                  </label>
                )
                  : `${recipe[measures[index]]} - ${recipe[ingredient]}`
              }
            </li>)
        ))
      }
    </ul>
  );
}

IngredientsMap.propTypes = {
  ingredients: PropTypes.array,
  measures: PropTypes.array,
  recipe: PropTypes.array,
}.isRequired;

export default IngredientsMap;
