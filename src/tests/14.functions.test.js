import {
  fetchMeals,
  fetchDrinks,
  fetchMealTypes,
  filterByIng,
  getEmbed,
  fetchCocktailTypes,
  updateCategory,
  filterMealByType,
  filterDrinkByType,
  fetchDetails,
  getSavedEmail,
  getRandomId,
  getRecipeIng,
  getNacionalities,
  defaultFetch,
  saveFavorite,
  getFavoriteIds,
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
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetchMealTypes().then((data) => {
      expect(fetch).toHaveBeenCalledWith(url);
      expect(data).toHaveLength(NUMB_OF_TYPES);
    });
  });

  test('teste se fetchCocktailTypes retorna 5 itens', () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetchCocktailTypes().then((data) => {
      expect(fetch).toHaveBeenCalledWith(url);
      expect(data).toHaveLength(NUMB_OF_TYPES);
    });
  });

  test('Teste a função updateCategory', () => {
    const equalTest = updateCategory('Beef', 'Beef');
    expect(equalTest).toBe('All');
    const newCategory = updateCategory('Cake', 'All');
    expect(newCategory).toBe('Cake');
  });
});

describe('Testes das demais funções da pasta services', () => {
  test('Teste a função filterByCategories', () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    filterMealByType('Seafood', 'All').then((result) => {
      expect(fetch).toHaveBeenCalledWith(url);
      expect(result).toHaveLength(NUMB_OF_RECIPES);
    });
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
    filterDrinkByType('Ordinary_Drink', 'All').then((drinks) => {
      expect(fetch).toHaveBeenCalledWith(drinkUrl);
      expect(drinks).toHaveLength(NUMB_OF_RECIPES);
    });
  });
  test('Teste o erro da função fetchDetails', () => {
    fetchDetails('2478').then((result) => {
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(0);
    });
  });
  test('Teste a função getSavedEmail', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'x' }));
    const userName = getSavedEmail();
    expect(userName).toBe('x');
  });
  test('Teste a função getRandomId', async () => {
    const firstResult = await getRandomId();
    const secondResult = await getRandomId();
    expect(firstResult).not.toBe(secondResult);
  });
  test('Teste a função getRecipeIng', async () => {
    const ingredients = await getRecipeIng(true);
    expect(ingredients).toHaveLength(NUMB_OF_RECIPES);
  });
  test('Teste a função filterByIng', async () => {
    const recipes = await filterByIng('Beef');
    expect(recipes).toHaveLength(NUMB_OF_RECIPES);
  });
  test('Teste se a função defaultFetch é utilizada', () => {
    getNacionalities().then(() => {
      expect(defaultFetch).toHaveBeenCalled();
    });
  });
  test('Teste a função filterByNacionality', () => {
    filterByNacionality('All').then(() => {
      expect(fetchMeals).toHaveBeenCalled();
    });
  });
});

describe('Testes do arquivo functions - Parte 3 de 3', () => {
  test('Teste o localStorage das Favoritas', () => {
    const mockIds = ['0', '1', '2'];
    saveFavorite(mockIds);
    expect(getFavoriteIds()).toEqual(mockIds);
  });
});
