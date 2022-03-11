import React from 'react';
import DoneFilters from './DoneFilters';
import Header from './Header';

function Done() {
  return (
    <div>
      <Header hasProfileIcon name="Done Recipes" />
      <DoneFilters />
    </div>
  );
}

export default Done;
