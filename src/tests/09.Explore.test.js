import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { EXPLORE_IMGS } from './mocks';

describe('Teste a página Explore', () => {
  test('Teste o título Explore', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Explore');
  });

  test('Teste se há 4 imagens', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(EXPLORE_IMGS.length);
  });
});
