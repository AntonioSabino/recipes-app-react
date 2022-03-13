import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { MARGARITA, PATH } from './mocks';

describe('Teste a página de Receitas Favoritas', () => {
  test('Teste se é possível encontrar uma receita favorita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/53013');
    const heartBtn = await screen.findByTestId('favorite-btn');
    expect(heartBtn).toHaveAttribute('alt', 'heart');
    userEvent.click(heartBtn);
    history.push('/profile');
    const favoriteBtn = await screen.findByRole('link', 'Favorite Recipes');
    userEvent.click(favoriteBtn);
    const bigMac = await screen.findAllByText('Big Mac');
    expect(bigMac).toBeInTheDocument();
    const { location } = history;
    expect(location.pathname).toBe(PATH.favorite);
  });

  test('Teste o título da página Favorite-Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.favorite);
    const allTitles = await screen.findAllByText('Favorite Recipes');
    expect(allTitles).toHaveLength(1);
  });
  test('Teste o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MARGARITA));
    history.push(PATH.favorite);
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
