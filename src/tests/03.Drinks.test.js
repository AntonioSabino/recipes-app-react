import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { NUMB_OF_RECIPES, RADIOS } from './mocks';

describe('Teste a página de receitas (Foods)', () => {
  test('Teste se há 12 imagens de receitas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const firstTest = '0-recipe-card';
    const fstImage = await screen.findByTestId(firstTest);
    expect(fstImage).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
    userEvent.click(screen.getByTestId('Shake-category-filter'));
    const recipeImages = await screen.findAllByAltText('recipe');
    expect(recipeImages).toHaveLength(NUMB_OF_RECIPES);
  });

  test('Teste o botão de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchIcon = screen.getAllByRole('button');
    userEvent.click(searchIcon[0]);
    expect(screen.getByTestId('exec-search-btn')).toHaveTextContent('Search');
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    RADIOS.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });
});
