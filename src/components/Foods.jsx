import React, { useState } from 'react';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import FoodRecipes from './FoodRecipes';
import { fetchMealTypes } from '../services/functions';

function Foods() {
  const [mealTypes, setMealTypes] = useState([]);
  useEffect(() => {
    fetchMealTypes().then((types) => setMealTypes(types));
  }, []);

  return (
    <div>
      <Header hasProfileIcon hasSearchIcon name="Foods" />
      <Categories categories={ mealTypes } />
      <section className="recipes">
        <FoodRecipes />
      </section>
      <Footer />
    </div>
  );
}

export default Foods;
