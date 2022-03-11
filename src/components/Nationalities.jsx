import React from 'react';
import Footer from './Footer';
import Header from './Header';
import FoodRecipes from './FoodRecipes';
import SelectNacionality from './SelectNacionality';

function Nationalities() {
  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Explore Nationalities" />
      <SelectNacionality />
      <section className="recipes">
        <FoodRecipes />
      </section>
      <Footer />
    </div>
  );
}

export default Nationalities;
