import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { EXPLORE_FOODS_LINKS, EXPLORE_IMGS, PATH } from './mocks';

describe('Teste a página Explore Foods', () => {
  test('Teste o título Explore Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.exploreFoods);
    const title = screen.getAllByRole('heading', { level: 1 });
    expect(title[0]).toHaveTextContent('Explore Foods');
  });

  test('Teste se há 4 imagens', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.exploreFoods);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(EXPLORE_IMGS.length);
  });

  test('Teste se os links estão corretos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH.exploreFoods);
    const links = screen.getAllByRole('heading');
    EXPLORE_FOODS_LINKS.forEach((linkName, index) => {
      expect(links[index + 1]).toHaveTextContent(linkName);
    });
    const surprise = screen.getByTestId('explore-surprise');
    act(() => {
      userEvent.click(surprise);
    });
    expect(surprise).toBeInTheDocument();
  });
});
