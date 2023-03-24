// import './SignupPage.css'
import React, { useState } from 'react';
import { User } from '../types/UserTypes'
import { SignupPageProps } from '../types/FormTypes'


function SignupPage({handleSubmit}: SignupPageProps) {
  const [user, setUser] = useState<User>({
    username: '',
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
    handleSubmit(user)
    // Check if username is unique
    // If not, display error message
    // Otherwise, submit form data
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
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
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupPage
