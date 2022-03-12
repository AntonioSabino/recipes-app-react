import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { DONE_BTNS, DONE_DATATESTS } from './mocks';

describe('Teste a página de Receitas Feitas', () => {
  test('Teste se é possível encontrar uma receita feita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/12654');
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toHaveTextContent('Start Recipe');
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toHaveTextContent('Finalizar');
    userEvent.click(finishBtn);
    history.push('/profile');
    const doneBtn = await screen.findByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    const shakeName = await screen.findAllByText('Banana Strawberry Shake');
    expect(shakeName).toBeInTheDocument();
    const { location } = history;
    expect(location.pathname).toBe('/done-recipes');
  });

  test('Teste os botões da página Done-Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const initialDataTest = 'filter-by-';
    const dataTestIds = DONE_DATATESTS
      .map((dataTest) => initialDataTest.concat(dataTest));
    const allBtn = await screen.findByTestId(dataTestIds[0]);
    expect(allBtn).toHaveTextContent(DONE_BTNS[0]);
    const foodBtn = screen.getByTestId(dataTestIds[1]);
    expect(foodBtn).toHaveTextContent(DONE_BTNS[1]);
    const drinksBtn = screen.getByTestId(dataTestIds[2]);
    expect(drinksBtn).toHaveTextContent(DONE_BTNS[2]);
  });
});
