import React from 'react';
import Footer from './Footer';
import Header from './Header';
import IngredientButtons from './IngredientButtons';

function DrinksIngredients() {
  return (
    <div>
      <Header hasProfileIcon name="Explore Ingredients" />
      <IngredientButtons isDrink />
      <Footer />
    </div>
  );
}

export default DrinksIngredients;
