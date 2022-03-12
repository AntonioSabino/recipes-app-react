import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { NUMB_OF_RECIPES, PATH } from './mocks';

describe('Teste a página Explore Nationalities', () => {
  test('Teste o título Explore Nationalities', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.nationalities);
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Explore Nationalities');
  });

  test('Teste se há um dropbox', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.nationalities);
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
  });

  test('Teste se há 12 imagens de receitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.nationalities);
    for (let i = 0; i < NUMB_OF_RECIPES; i += 1) {
      const strTest = `${i}-recipe-card`;
      const image = screen.getAllByTestId(strTest);
      expect(image).toBeInTheDocument();
    }
  });

  test('Teste se redireciona para detalhes ao clicar em uma receita', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.nationalities);
    const strTest = '0-recipe-card';
    const recipe = screen.queryByTestId(strTest);
    userEvent.click(recipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52977');
  });
});
