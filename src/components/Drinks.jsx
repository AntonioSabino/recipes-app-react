import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Drinks() {
  const { dataDrinks, cocktailTypes } = useContext(AppContext);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Drinks" />
      <Recipes isDrink data={ dataDrinks } />
      <Categories isDrink categories={ cocktailTypes } />
      <Footer />
    </div>
  );
}

export default Drinks;
