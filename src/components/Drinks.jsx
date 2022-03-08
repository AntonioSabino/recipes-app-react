import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Drinks() {
  const { dataDrinks } = useContext(AppContext);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Drinks" />
      <Recipes isDrink data={ dataDrinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
