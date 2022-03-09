import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import FoodRecipes from './FoodRecipes';

function Foods() {
  const { mealTypes } = useContext(AppContext);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Foods" />
      <Categories categories={ mealTypes } />
      <FoodRecipes />
      <Footer />
    </div>
  );
}

export default Foods;
