import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { filterByNacionality } from '../services/functions';
import FoodRecipes from './FoodRecipes';

function Nationalities() {
  const [nationalities, setNationalities] = useState({ meals: [] });

  useEffect(() => {
    filterByNacionality().then((data) => setNationalities(data));
  }, []);
  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Explore Nationalities" />
      <select data-testid="explore-by-nationality-dropdown">
        {nationalities.meals.map(({ strArea }) => (
          <option data-testid={ `${strArea}-option` } key={ strArea }>{strArea}</option>
        ))}
      </select>
      <FoodRecipes />
      <Footer />
    </div>
  );
}

export default Nationalities;
