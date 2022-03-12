import {
  fetchMeals,
  fetchDrinks,
  fetchMealTypes,
  filterByIng,
  getEmbed,
} from '../services/functions';
import { NUMB_OF_RECIPES, NUMB_OF_TYPES } from './mocks';

describe('Teste as funções auxiliares', () => {
  test('teste se fetchMeals retorna 12 itens', () => {
    fetchMeals('', 'Name').then((data) => {
      expect(data).toHaveLength(NUMB_OF_RECIPES);
    });
  });

  test('teste se fetchDrinks retorna 12 itens', () => {
    fetchDrinks('', 'Name').then((data) => {
      expect(data).toHaveLength(NUMB_OF_RECIPES);
    });
  });

  test('Teste a função de incorporar url do Youtube', () => {
    const url = getEmbed('https://www.youtube.com/watch?v=154782');
    const result = 'https://www.youtube.com/embed/154782';
    expect(url).toBe(result);
  });

  test('teste a url da função filterByIng', () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=lemon';
    filterByIng('lemon').then(() => {
      expect(fetch).toHaveBeenCalledWith(url);
    });
  });

  test('teste se fetchMealTypes retorna 5 itens', () => {
    fetchMealTypes().then((data) => {
      expect(fetch).toHaveBeenCalledWith(url);
      expect(data).toHaveLength(NUMB_OF_TYPES);
    });
  });
});

// testes podem ser adicionados para as seguintes funções:

// export const fetchCocktailTypes = async () => {
//   const data = await fetchCategories('cocktail');
//   return data.drinks.slice(0, MAX_TYPES);
// };

// export const updateCategory = (newType, prevType) => {
//   if (newType === prevType) {
//     return 'All';
//   }
//   return newType;
// };

// const filterByCategories = async (name, category) => {
//   const endpoint = `https://www.the${name}db.com/api/json/v1/1/filter.php?c=${category}`;
//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const filterDrinkByType = async (newType, prevType) => {
//   if (newType === prevType) {
//     const drinks = await fetchDrinks('', 'Name');
//     return drinks;
//   }
//   const data = await filterByCategories('cocktail', newType);
//   return data.drinks.slice(0, MAX_RECIPES);
// };

// export const filterMealByType = async (newType, prevType) => {
//   if (newType === prevType) {
//     const meals = await fetchMeals('', 'Name');
//     return meals;
//   }
//   const data = await filterByCategories('meal', newType);
//   return data.meals.slice(0, MAX_RECIPES);
// };

// export const fetchDetails = async (id, name) => {
//   const endpoint = `https://www.the${name}db.com/api/json/v1/1/lookup.php?i=${id}`;
//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     // return datadrinks.slice(0, MAX_RECIPES);
//     if (name === 'meal') {
//       return data.meals;
//     }
//     return data.drinks;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getSavedEmail = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user).email : 'email@xyz.com';
// };

// const defaultFetch = async (endpoint) => {
//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return '';
//   }
// };

// export const getRandomId = async (isDrink) => {
//   const name = isDrink ? 'thecocktaildb' : 'themealdb';
//   const endpoint = `https://www.${name}.com/api/json/v1/1/random.php`;
//   const data = await defaultFetch(endpoint);
//   const id = isDrink ? data.drinks[0].idDrink : data.meals[0].idMeal;
//   const initialPath = isDrink ? '/drinks/' : '/foods/';
//   return `${initialPath}${id}`;
// };

// export const getRecipeIng = async (isDrink) => {
//   const name = isDrink ? 'thecocktaildb' : 'themealdb';
//   const endpoint = `https://www.${name}.com/api/json/v1/1/list.php?i=list`;
//   const data = await defaultFetch(endpoint);
//   const info = isDrink
//     ? data.drinks.slice(0, MAX_RECIPES) : data.meals.slice(0, MAX_RECIPES);
//   const ingredients = isDrink
//     ? info.map(({ strIngredient1 }) => strIngredient1)
//     : info.map(({ strIngredient }) => strIngredient);
//   return ingredients;
// };

// export const filterByIng = async (ingredient, isDrink) => {
//   const url = isDrink
//     ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
//     : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
//   const data = await defaultFetch(url);
//   const filtered = isDrink ? data.drinks : data.meals;
//   return filtered.slice(0, MAX_RECIPES);
// };

// export const getNacionalities = async () => {
//   const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
//   const data = await defaultFetch(url);
//   return data.meals;
// };

// export const filterByNacionality = async (nacionality) => {
//   if (nacionality === 'All') {
//     return fetchMeals('', 'Name');
//   }
//   const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nacionality}`;
//   const data = await defaultFetch(url);
//   return data.meals.slice(0, MAX_RECIPES);
// };

// export const getFavoriteIds = () => {
//   const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   const favorites = data || [];
//   return favorites.map(({ id }) => id);
// };

// export const saveFavorite = (data) => {
//   const prevData = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   const favorites = prevData || [];
//   const newFavorites = [...favorites, data];
//   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
// };
