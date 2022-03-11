import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import DrinkRecipes from './DrinkRecipes';
import { fetchCocktailTypes } from '../services/functions';

function Drinks() {
  const [cocktailTypes, setCocktailTypes] = useState([]);
  useEffect(() => {
    fetchCocktailTypes().then((types) => setCocktailTypes(types));
  }, []);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Drinks" />
      <Categories isDrink categories={ cocktailTypes } />
      <section className="recipes">
        <DrinkRecipes />
      </section>
      <Footer />
    </div>
  );
}

export default Drinks;
