import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Foods() {
  const { dataMeals } = useContext(AppContext);

  console.log(dataMeals);
  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Foods" />
      <Recipes data={ dataMeals } />
      <Footer />
    </div>
  );
}

export default Foods;
