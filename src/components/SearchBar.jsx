import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { FST_LETTER } from '../services/consts';
import { fetchMeals, fetchDrinks } from '../services/functions';

function SearchBar() {
  const {
    inputValue,
    setInputValue,
    searchType,
    setSearchType,
    setDataMeals,
    setDataDrinks,
  } = useContext(AppContext);

  const drinksOrMeals = () => {
    if (window.location.pathname === '/drinks') {
      fetchDrinks(inputValue, searchType).then((drinks) => {
        setDataDrinks(drinks);
        if (drinks.length === 1) {
          window.location.href = `/drinks/${drinks[0].idDrink}`;
        }
        if (drinks.length === 0) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      });
    } else {
      fetchMeals(inputValue, searchType).then((meals) => {
        setDataMeals(meals);
        if (meals.length === 1) {
          window.location.href = `/foods/${meals[0].idMeal}`;
        }
        if (meals.length === 0) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      });
    }
  };

  const handleClick = () => {
    if (searchType === FST_LETTER && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      drinksOrMeals();
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search Recipe"
        data-testid="search-input"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <div>
        <label htmlFor="Ingredients">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredients"
            name="search"
            id="Ingredients"
            onClick={ () => setSearchType('Ingredients') }
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="Name"
            value="Name"
            name="search"
            onClick={ () => setSearchType('Name') }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetter"
            value={ FST_LETTER }
            name="search"
            onClick={ () => setSearchType(FST_LETTER) }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
