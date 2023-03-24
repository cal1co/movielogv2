import { useState } from 'react';
import { UserLogin } from '../types/UserTypes';
import { LoginPageProps } from '../types/FormTypes'



function LoginPage({handleSubmit}: LoginPageProps) {
  const [user, setUser] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(user);
    // Check if username is unique
    // If not, display error message
    // Otherwise, submit form data
  };

  return (
    <form onSubmit={handleFormSubmit} aria-label="form">
      <div>
        <label htmlFor="email">Email or Username:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
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
