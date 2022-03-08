import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';

function Foods() {
  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Foods" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
