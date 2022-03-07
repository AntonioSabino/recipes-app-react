import React from 'react';

const Login = () => (
  <form>
    <label htmlFor="email">
      Email
      <input
        type="email"
        name=""
        id=""
        data-testid="email-input"
        placeholder="Digite seu email"
      />
    </label>
    <label htmlFor="password">
      Senha
      <input
        type="password"
        name=""
        id=""
        data-testid="password-input"
        placeholder="Digite sua senha"
      />
    </label>

    <button type="button" data-testid="login-submit-btn">
      Entrar
    </button>
  </form>
);

export default Login;
