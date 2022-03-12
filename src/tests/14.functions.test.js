import { fetchMeals, filterByIng, getEmbed } from '../services/functions';
import { NUMB_OF_RECIPES } from './mocks';

describe('Teste as funções auxiliares', () => {
  test('teste se fetchMeals retorna 12 itens', () => {
    fetchMeals('', 'Name').then((data) => {
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
});
