import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import DrinkRecipes from './DrinkRecipes';

function Drinks() {
  const { cocktailTypes } = useContext(AppContext);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Drinks" />
      <Categories isDrink categories={ cocktailTypes } />
      <DrinkRecipes />
      <Footer />
    </div>
  );
}

export default Drinks;
