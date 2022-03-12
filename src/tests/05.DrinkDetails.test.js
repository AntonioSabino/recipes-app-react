import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PATH } from './mocks';

describe('Teste a página de Detalhes de Bebidas', () => {
  test('Teste o ícore de coração', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.drinkDetails);
    const iconName = 'heart';
    const icon = screen.getByTestId('favorite-btn');
    expect(icon).toHaveAttribute('alt', iconName);
  });

  test('Teste o botão de iniciar receita', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.drinkDetails);
    const buttonName = 'Start Recipe';
    const button = screen.getByRole('button', { name: buttonName });
    userEvent.click(button);
    const loading = screen.getByRole('heading', { name: 'Carregando...' });
    expect(loading).toBeInTheDocument();
  });

  test('Teste o botão de compartilhar', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.drinkDetails);
    const button = screen.getByTestId('share-btn');
    userEvent.click(button);
    const copyPhrase = screen.getByRole('heading', { name: 'Link copied!' });
    expect(copyPhrase).toBeInTheDocument();
  });
});
