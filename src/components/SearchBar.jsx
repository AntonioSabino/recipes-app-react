import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import fetchData from '../services/functions';

function SearchBar() {
  const {
    inputValue,
    setInputValue,
    searchType,
    setSearchType,
    setData,
  } = useContext(AppContext);

  const handleClick = () => {
    fetchData(inputValue, searchType).then((meals) => setData(meals));
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
            value="First Letter"
            name="search"
            onClick={ () => setSearchType('First Letter') }
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
