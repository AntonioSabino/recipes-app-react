import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se há a página NotFound para url errado', () => {
  test('Teste o título da página NotFound', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/admin');
    const allTitles = await screen.findAllByRole('heading', { name: 'Not Found' });
    expect(allTitles).toHaveLength(1);
  });
});
