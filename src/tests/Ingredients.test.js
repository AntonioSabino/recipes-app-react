import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PATH } from './mocks';

describe('Teste a página Explore Ingredients', () => {
  test('Teste o título Explore Ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Explore Ingredients');
  });

  test('Teste se há 12 cards', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-ingredient-card`;
      const card = screen.getByTestId(testidCard);
      expect(card).toBeInTheDocument();
    }
  });

  test('Teste se cada card tem uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-card-img`;
      const cardImg = screen.getByTestId(testidCard);
      expect(cardImg).toBeInTheDocument();
    }
  });

  test('Teste se cada card tem um título', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-card-name`;
      const cardName = screen.getByTestId(testidCard);
      expect(cardName).toBeInTheDocument();
    }
  });
});
