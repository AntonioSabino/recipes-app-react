import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        type="text"
        placeholder="Search Recipe"
        data-testid="search-input"
      />
      <div>
        <label htmlFor="Ingredients">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredients"
            name="search"
            id="Ingredients"
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            value="Name"
            name="search"
          />
          Name
        </label>
        <label htmlFor="First Letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="First Letter"
            name="search"
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
