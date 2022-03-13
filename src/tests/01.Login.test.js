import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste a página de login', () => {
  test('Teste se há um header escrito Login', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(/Login/i);
  });

  test('Teste se há os inputs de email e password', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toHaveAttribute('data-testid', 'email-input');
    expect(passwordInput).toHaveAttribute('data-testid', 'password-input');
  });

  test('Teste se há um botão para Entrar', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/Entrar/i);
  });
});
