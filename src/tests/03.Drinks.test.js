import { act, screen } from '@testing-library/react';
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
    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toHaveTextContent('Search');
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'shake');
    const fstRadio = screen.getByTestId(RADIO[0]);
    userEvent.click(fstRadio);
    userEvent.click(execBtn);
    RADIOS.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });
  test('Teste a barra de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchIcon = screen.getAllByRole('button', { name: 'search-icon' });
    act(() => {
      userEvent.click(searchIcon[0]);
    });
    const searchInput = screen.getByTestId('search-input');
    act(() => {
      userEvent.type(searchInput, 'Gin');
    });
    const radioInput = screen.getByTestId('ingredient-search-radio');
    act(() => {
      userEvent.click(radioInput);
      userEvent.click(screen.getByTestId('exec-search-btn'));
    });
    expect(searchInput).toBeInTheDocument();
  });
  test('Teste as categorias', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const foodsTitle = await screen.findByRole('heading', { name: 'Drinks' });
    expect(foodsTitle).toBeInTheDocument();
    const fstImage = await screen.findByTestId('0-recipe-card');
    expect(fstImage).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
    act(() => {
      userEvent.click(screen.getByTestId('Cocktail-category-filter'));
    });
    const recipeImages = await screen.findAllByAltText('recipe');
    expect(recipeImages).toHaveLength(NUMB_OF_RECIPES);
  });
});
