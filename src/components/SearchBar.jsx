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
            type="radio"
            value="Ingredients"
            name="search"
            id="Ingredients"
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            type="radio"
            value="Name"
            name="search"
          />
          Name
        </label>
        <label htmlFor="First Letter">
          <input
            type="radio"
            value="First Letter"
            name="search"
          />
          First Letter
        </label>
      </div>
      <button type="button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
