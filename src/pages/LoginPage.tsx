import { useState } from 'react';
import { UserLogin } from '../types/UserTypes';
import { LoginPageProps } from '../types/FormTypes'
import axios from 'axios'

function LoginPage({handleSubmit}: LoginPageProps) {
  const [user, setUser] = useState<UserLogin>({
    usernameOrEmail: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('' as string);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', user);

      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      setErrorMessage('' + error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} aria-label="form">
      <div>
        <label htmlFor="usernameOrEmail">Email or Username:</label>
        <input
          type=""
          id="usernameOrEmail"
          name="usernameOrEmail"
          value={user.usernameOrEmail}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
