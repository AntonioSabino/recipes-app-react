import React from 'react';
import DoneFilters from './DoneFilters';
import DoneCards from './DoneCards';
import Header from './Header';

function Done() {
  return (
    <div>
      <Header hasProfileIcon name="Done Recipes" />
      <DoneFilters />
      <DoneCards />
    </div>
  );
}

export default Done;
