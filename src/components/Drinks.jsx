import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Drinks() {
  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Drinks" />
      <Recipes isDrink />
      <Footer />
    </div>
  );
}

export default Drinks;
