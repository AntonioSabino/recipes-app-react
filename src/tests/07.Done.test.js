import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { DONE_BTNS, DONE_DATATESTS, MARGARITA, PATH } from './mocks';

describe('Teste a página de Receitas Feitas', () => {
  test('Teste se é possível encontrar uma receita feita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/12654');
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toHaveTextContent('Start Recipe');
    act(() => {
      userEvent.click(startBtn);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toHaveTextContent('Finalizar');
    act(() => {
      userEvent.click(finishBtn);
    });
    history.push('/profile');
    const doneBtn = await screen.findByTestId('profile-done-btn');
    act(() => {
      userEvent.click(doneBtn);
    });
    const shakeName = await screen.findAllByText('Banana Strawberry Shake');
    expect(shakeName).toBeInTheDocument();
    const { location } = history;
    expect(location.pathname).toBe(PATH.done);
  });

  test('Teste os botões da página Done-Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.done);
    const initialDataTest = 'filter-by-';
    const dataTestIds = DONE_DATATESTS
      .map((dataTest) => initialDataTest.concat(dataTest));
    const allBtn = await screen.findByTestId(dataTestIds[0]);
    expect(allBtn).toHaveTextContent(DONE_BTNS[0]);
    const foodBtn = screen.getByTestId(dataTestIds[1]);
    expect(foodBtn).toHaveTextContent(DONE_BTNS[1]);
    const drinksBtn = screen.getByTestId(dataTestIds[2]);
    act(() => {
      userEvent.click(drinksBtn);
    });
    expect(drinksBtn).toHaveTextContent(DONE_BTNS[2]);
  });
  test('Teste o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MARGARITA));
    history.push(PATH.done);
    const name = await screen.findAllByRole('img', { name: MARGARITA[0].name });
    expect(name[0]).toBeInTheDocument();
    const shareIcon = screen.queryAllByAltText('share icon');
    act(() => {
      userEvent.click(shareIcon[0]);
    });
    const copiedText = await screen.findAllByText(/copied/i);
    expect(copiedText[0]).toBeInTheDocument();
  });
});
