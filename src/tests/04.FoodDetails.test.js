import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { DETAILS_TESTS, PATH } from './mocks';

describe('Teste a página de Detalhes', () => {
  test('Teste o botão Start Recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.details);
    const buttonName = 'Start Recipe';
    const button = await screen.findByRole('button', { name: buttonName });
    expect(button).toHaveTextContent(buttonName);
  });

  test('Teste os data-testids da página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.details);
    const title = await screen.findByRole('heading', { name: 'Corba' });
    expect(title).toBeInTheDocument();
    DETAILS_TESTS.forEach((testId) => {
      const element = screen.getByTestId(testId);
      expect(element).toBeInTheDocument();
    });
  });
});
