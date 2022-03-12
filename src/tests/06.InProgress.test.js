import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste a página Receita em Progresso', () => {
  test('Teste se é possível iniciar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const bigMac = await screen.findByTestId('10-card-img');
    userEvent.click(bigMac);
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toHaveTextContent('Start Recipe');
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toHaveTextContent('Finalizar');
    const { location } = history;
    expect(location.pathname).toBe('/foods/53013/in-progress');
  });
});
