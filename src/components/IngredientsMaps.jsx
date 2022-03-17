import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCheckedIngredients, saveChecked } from '../services/functions';
import AppContext from '../context/AppContext';

function IngredientsMap({ ingredients, measures, recipe, path, recipeId }) {
  const { setFinishButton } = useContext(AppContext);
  const [isCheked, setIsCheked] = useState(
    new Array(ingredients.length).fill(false),
  );

  console.log(ingredients);

  const handleChange = (position) => {
    const updatedChecked = isCheked.map(
      (item, index) => (index === position ? !item : item),
    );
    const storageData = {
      id: recipeId,
      checked: updatedChecked,
    };
    setFinishButton(updatedChecked.every((checked) => checked === true));

    setIsCheked(updatedChecked);
    saveChecked(storageData, recipeId, path);
  };

  useEffect(() => {
    const newChecked = getCheckedIngredients(recipeId, path);
    if (newChecked.length) {
      setFinishButton(newChecked[0].checked.every((checked) => checked === true));
      setIsCheked(newChecked[0].checked);
    }
  }, [path, recipeId, setFinishButton, setIsCheked]);

  return (
    <ul className="ingredients-ul">
      {
        ingredients.map((ingredient, index) => (
          ingredient && (
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
                    {` - ${recipe[measures[index]]} - ${ingredient[1]}`}
                  </label>
                )
                  : `${recipe[measures[index]]} - ${ingredient[1]}`
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
