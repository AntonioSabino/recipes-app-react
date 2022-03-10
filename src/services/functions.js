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

export const updateCategory = (newType, prevType) => {
  if (newType === prevType) {
    return 'All';
  }
  return newType;
};

const filterByCategories = async (name, category) => {
  const endpoint = `https://www.the${name}db.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const filterDrinkByType = async (newType, prevType) => {
  if (newType === prevType) {
    const drinks = await fetchDrinks('', 'Name');
    return drinks;
  }
  const data = await filterByCategories('cocktail', newType);
  return data.drinks.slice(0, MAX_RECIPES);
};

export const filterMealByType = async (newType, prevType) => {
  if (newType === prevType) {
    const meals = await fetchMeals('', 'Name');
    return meals;
  }
  const data = await filterByCategories('meal', newType);
  return data.meals.slice(0, MAX_RECIPES);
};

export const fetchDetails = async (id, name) => {
  const endpoint = `https://www.the${name}db.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    // return datadrinks.slice(0, MAX_RECIPES);
    if (name === 'meal') {
      return data.meals;
    }
    return data.drinks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSavedEmail = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).email : 'email@xyz.com';
};

const defaultFetch = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const getRandomId = async (isDrink) => {
  const name = isDrink ? 'thecocktaildb' : 'themealdb';
  const endpoint = `https://www.${name}.com/api/json/v1/1/random.php`;
  const data = await defaultFetch(endpoint);
  const id = isDrink ? data.drinks[0].idDrink : data.meals[0].idMeal;
  const initialPath = isDrink ? '/drinks/' : '/foods/';
  return `${initialPath}${id}`;
};

export const getRecipeIng = async (isDrink) => {
  const name = isDrink ? 'thecocktaildb' : 'themealdb';
  const endpoint = `https://www.${name}.com/api/json/v1/1/list.php?i=list`;
  const data = await defaultFetch(endpoint);
  const info = isDrink
    ? data.drinks.slice(0, MAX_RECIPES) : data.meals.slice(0, MAX_RECIPES);
  const ingredients = isDrink
    ? info.map(({ strIngredient1 }) => strIngredient1)
    : info.map(({ strIngredient }) => strIngredient);
  return ingredients;
};

export const filterByIng = async (ingredient, isDrink) => {
  const url = isDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await defaultFetch(url);
  const filtered = isDrink ? data.drinks : data.meals;
  return filtered.slice(0, MAX_RECIPES);
};

export const filterByNacionality = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const data = await defaultFetch(url);
  return data;
};

export const getFavoriteIds = () => {
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorites = data || [];
  return favorites.map(({ id }) => id);
};

export const saveFavorite = (data) => {
  const prevData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorites = prevData || [];
  const newFavorites = [...favorites, data];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};
