import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FOOD_BTNS, NUMB_OF_RECIPES } from './mocks';

describe('Teste a página de receitas (Foods)', () => {
  test('Teste o Login redireciona para Foods', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'naouseessasenha');
    userEvent.click(button);
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
    userEvent.click(screen.getByTestId('Beef-category-filter'));
    const recipeImages = await screen.findAllByAltText('recipe');
    expect(recipeImages).toHaveLength(NUMB_OF_RECIPES);
  });
});
