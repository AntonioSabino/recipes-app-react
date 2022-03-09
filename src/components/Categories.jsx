import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { filterDrinkByType, filterMealByType,
  updateCategory } from '../services/functions';

function Categories({ categories, isDrink }) {
  const { setDataDrinks,
    setDataMeals,
    foodCategory,
    setFoodCategory,
    drinkCategory,
    setDrinkCategory,
  } = useContext(AppContext);

  const handleClick = (strCategory) => {
    if (isDrink) {
      filterDrinkByType(strCategory, drinkCategory).then((data) => {
        setDataDrinks(data);
        setDrinkCategory(updateCategory(strCategory, drinkCategory));
      });
    } else {
      filterMealByType(strCategory, foodCategory).then((data) => {
        setDataMeals(data);
        setFoodCategory(updateCategory(strCategory, foodCategory));
      });
    }
  };

  const clearFilter = () => (isDrink
    ? handleClick(drinkCategory)
    : handleClick(foodCategory));

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clearFilter }
      >
        All
      </button>
      { categories.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          { strCategory }
        </button>
      )) }
    </section>
  );
}

Categories.propTypes = {
  isDrink: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string,
  })),
}.isRequired;

export default Categories;
