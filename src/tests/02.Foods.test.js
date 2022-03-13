import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FOOD_BTNS, NUMB_OF_RECIPES, RADIOS } from './mocks';

describe('Teste a página de receitas (Foods)', () => {
  test('Teste o Login redireciona para Foods', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    act(() => {
      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, 'naouseessasenha');
    });
    act(() => {
      const button = screen.getByTestId('login-submit-btn');
      userEvent.click(button);
    });
    const foodsTitle = await screen.findByRole('heading', { name: 'Foods' });
    expect(foodsTitle).toBeInTheDocument();
  });

  test('Teste se há 12 imagens de receitas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodsTitle = await screen.findByRole('heading', { name: 'Foods' });
    expect(foodsTitle).toBeInTheDocument();
    const fstImage = await screen.findByTestId('0-recipe-card');
    expect(fstImage).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
    screen.findByTestId(`${FOOD_BTNS[0]}-category-filter`).then((firstBtn) => {
      expect(firstBtn).toBeInTheDocument();
      for (let i = 1; i < FOOD_BTNS.length; i += 1) {
        const strTest = `${FOOD_BTNS[i]}-category-filter`;
        const filterBtn = screen.getByTestId(strTest);
        expect(filterBtn).toBeInTheDocument();
      }
    });
    act(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    });
    const recipeImages = await screen.findAllByAltText('recipe');
    expect(recipeImages).toHaveLength(NUMB_OF_RECIPES);
  });
  test('Teste a barra de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getAllByRole('button', { name: 'search-icon' });
    act(() => {
      userEvent.click(searchIcon[0]);
    });
    const searchInput = screen.getByTestId('search-input');
    act(() => {
      userEvent.type(searchInput, 'a');
    });
    RADIOS.forEach((datatest) => {
      const radioInput = screen.getByTestId(datatest);
      act(() => {
        userEvent.click(radioInput);
      });
    });
    act(() => {
      userEvent.click(screen.getByTestId('exec-search-btn'));
    });
    expect(searchInput).toBeInTheDocument();
  });
  test('Teste os botões de categorias', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodsTitle = await screen.findByRole('heading', { name: 'Foods' });
    expect(foodsTitle).toBeInTheDocument();
    const recipeImages = await screen.findAllByAltText('recipe');
    expect(recipeImages).toHaveLength(NUMB_OF_RECIPES);
    screen.findByTestId('Goat-category-filter').then((goatBtn) => {
      expect(goatBtn).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    });
  });
});
