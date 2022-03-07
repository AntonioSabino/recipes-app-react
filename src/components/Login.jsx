import React, { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const validadeButton = () => {
    /**
      * Validação com Regex consultada em
      * https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    */
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const MIN_LENGTH = 6;
    const validateEmail = emailRegex.test(email);
    if (validateEmail && password.length > MIN_LENGTH) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validadeButton();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
          placeholder="Digite seu email"
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          id="password"
          defaultValue={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
          placeholder="Digite sua senha"
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Entrar
      </button>
    </form>
  );
};
export default Login;
