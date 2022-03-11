import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FOOD_BTNS, NUMB_OF_RECIPES } from './mocks';

describe('Teste a página de receitas (Foods)', () => {
  test('Teste o Login redireciona para Foods', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'naouseessasenha');
    userEvent.click(button);
    const foodsTitle = screen.getByRole('heading', { level: 1 });
    expect(foodsTitle).toBeInTheDocument();
  });

  test('Teste se há 12 imagens de receitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getAllByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
  });

  test('Teste os botões de categorias', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    for (let i = 0; i < FOOD_BTNS.length; i += 1) {
      const strTest = `${FOOD_BTNS[i]}-category-filter`;
      const filterBtn = screen.getAllByTestId(strTest);
      expect(filterBtn).toBeInTheDocument();
    }
  });
});
