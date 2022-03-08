import { MAX_RECIPES } from './consts';

export const fetchMeals = async (input, type) => {
  console.log(input, type);
  const endpoint = {
    'First Letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
    Name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
    Ingredients: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
  };
  try {
    const response = await fetch(endpoint[type]);
    const data = await response.json();
    return data.meals.slice(0, MAX_RECIPES);
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrinks = async (input, type) => {
  const endpoint = {
    'First Letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
    Name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
    Ingredients: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
  };
  try {
    const response = await fetch(endpoint[type]);
    const data = await response.json();
    return data.drinks.slice(0, MAX_RECIPES);
  } catch (error) {
    console.error(error);
  }
};
