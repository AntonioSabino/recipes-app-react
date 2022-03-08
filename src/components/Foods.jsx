import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Foods() {
  const { dataMeals, mealTypes } = useContext(AppContext);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Foods" />
      <Categories categories={ mealTypes } />
      <Recipes data={ dataMeals } />
      <Footer />
    </div>
  );
}

export default Foods;
