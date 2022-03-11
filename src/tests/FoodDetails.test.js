import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PATH } from './mocks';

describe('Teste a página de Detalhes', () => {
  test('Teste o botão Start Recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.details);
    const buttonName = 'Start Recipe';
    const button = screen.getByRole('button', { name: buttonName });
    expect(button).toHaveTextContent(buttonName);
  });
});
