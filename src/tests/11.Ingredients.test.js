import { act, findAllByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { NUMB_OF_RECIPES, PATH } from './mocks';

describe('Teste a página Explore Ingredients', () => {
  test('Teste o título Explore Ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Explore Ingredients');
  });

  test('Teste se há 12 cards', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    const fstTest = await screen.findByTestId('0-ingredient-card');
    expect(fstTest).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-ingredient-card`;
      const card = screen.getByTestId(testidCard);
      expect(card).toBeInTheDocument();
    }
    act(() => {
      userEvent.click(fstTest);
    });
    const foodTitle = await findAllByText('Foods');
    expect(foodTitle[0]).toBeInTheDocument();
  });

  test('Teste se cada card tem uma imagem', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.ingredients);
    const fstTest = await screen.findByTestId('0-card-img');
    expect(fstTest).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-card-img`;
      const cardImg = screen.getByTestId(testidCard);
      expect(cardImg).toBeInTheDocument();
    }
  });

  test('Teste se cada card tem um título', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/ingredients');
    const fstTest = await screen.findByTestId('0-card-name');
    expect(fstTest).toBeInTheDocument();
    for (let i = 1; i < NUMB_OF_RECIPES; i += 1) {
      const testidCard = `${i}-card-name`;
      const cardName = screen.getByTestId(testidCard);
      expect(cardName).toBeInTheDocument();
    }
  });
});
