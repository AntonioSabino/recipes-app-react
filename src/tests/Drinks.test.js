import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { NUMB_OF_RECIPES } from './mocks';

describe('Teste a página de receitas (Foods)', () => {
  test('Teste se há 12 imagens de receitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getAllByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
  });

  test('Teste o botão de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchIcon = getByTestId('search-icon');
    userEvent.click(searchIcon);
    expect(getByTestId('exec-search-btn')).toHaveTextContent('Search');
  });
});
