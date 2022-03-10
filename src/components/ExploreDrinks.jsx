import React from 'react';
import ExploreButtons from './ExploreButtons';
import Footer from './Footer';
import Header from './Header';

function ExploreDrinks() {
  return (
    <div>
      <Header hasProfileIcon name="Explore Drinks" />
      <ExploreButtons isDrink />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
