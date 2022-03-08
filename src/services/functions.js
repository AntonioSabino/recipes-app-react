import { MAX_RECIPES, MAX_TYPES } from './consts';

export const fetchMeals = async (input, type) => {
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
    return [];
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
    return [];
  }
};

const fetchCategories = async (name) => {
  const endpoint = `https://www.the${name}db.com/api/json/v1/1/list.php?c=list`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    // return datadrinks.slice(0, MAX_RECIPES);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMealTypes = async () => {
  const data = await fetchCategories('meal');
  return data.meals.slice(0, MAX_TYPES);
};

export const fetchCocktailTypes = async () => {
  const data = await fetchCategories('cocktail');
  return data.drinks.slice(0, MAX_TYPES);
};
