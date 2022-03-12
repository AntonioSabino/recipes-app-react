import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PATH } from './mocks';

describe('Teste a página Profile', () => {
  test('Teste o título Profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.profile);
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Profile');
  });

  test('Teste os links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.profile);
    const done = screen.getByTestId('profile-done-btn');
    expect(done).toHaveTextContent('Done Recipes');
    const favorite = screen.getByTestId('profile-favorite-btn');
    expect(favorite).toHaveTextContent('Favorite Recipes');
    const logout = screen.getByTestId('profile-logout-btn');
    expect(logout).toHaveTextContent('Logout');
  });
});
