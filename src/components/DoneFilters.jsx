import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function DoneFilters() {
  const { setDoneFilter } = useContext(AppContext);
  return (
    <section className="doneFilters">
      <button
        type="button"
        onClick={ () => setDoneFilter('All') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setDoneFilter('food') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => setDoneFilter('drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </section>
  );
}

export default DoneFilters;
