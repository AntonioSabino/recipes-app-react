import { findAllByRole, findAllByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PROGRESS_MOCK } from './mocks';

describe('Teste a página Receita em Progresso', () => {
  test('Teste se é possível iniciar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const bigMac = await screen.findByTestId('10-card-img');
    act(() => {
      userEvent.click(bigMac);
    });
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toHaveTextContent('Start Recipe');
    act(() => {
      userEvent.click(startBtn);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toHaveTextContent('Finalizar');
    const { location } = history;
    expect(location.pathname).toBe('/foods/53013/in-progress');
  });
  test('Teste o botão Start Recipe com receitas em progresso', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(PROGRESS_MOCK));
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/17222');
    const finishBtn = await findAllByText('Finalizar');
    expect(finishBtn[0]).toBeInTheDocument();
    history.push('/foods/53060');
    const finishRecipeBtn = await findAllByText('Finalizar');
    expect(finishRecipeBtn[0]).toBeInTheDocument();
  });
  test('Teste os checkboxes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15346/in-progress');
    const checkboxes = await findAllByRole('checkbox');
    for (let i = 0; i < checkboxes.length; i += 1) {
      act(() => {
        userEvent.click(checkboxes[i]);
      });
    }
    const finishRecipeBtn = await findAllByText('Finalizar');
    expect(finishRecipeBtn[0]).toBeInTheDocument();
  });
});
