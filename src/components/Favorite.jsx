import React from 'react';
import DoneFilters from './DoneFilters';
import FavCards from './FavCards';
import Header from './Header';

function Favorite() {
  return (
    <div>
      <Header hasProfileIcon name="Favorite Recipes" />
      <DoneFilters />
      <FavCards />
    </div>
  );
}

export default Favorite;
