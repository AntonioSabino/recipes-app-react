import React from 'react';
import Footer from './Footer';
import Header from './Header';
import IngredientButtons from './IngredientButtons';

function Ingredients() {
  return (
    <div>
      <Header hasProfileIcon name="Explore Ingredients" />
      <IngredientButtons />
      <Footer />
    </div>
  );
}

export default Ingredients;
