import React from 'react';

function DoneFilters() {
  return (
    <section className="doneFilters">
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </section>
  );
}

export default DoneFilters;
