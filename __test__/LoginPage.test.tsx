import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../src/pages/LoginPage'
import axios from 'axios';
import React from 'react';
import { vi } from 'vitest'
import { Router, useNavigate, MemoryRouter } from 'react-router-dom';

vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const originalModule = vi.importActual('react-router-dom');
  return {
    ...originalModule,
    MemoryRouter: (await vi.importActual<typeof import('react-router-dom')>('react-router-dom')).MemoryRouter,
    useNavigate: () => vi.fn(), 
  }
});

describe('LoginPage', () => {
  it('updates the usernameOrEmail and password on user input', async () => {
    const { getByPlaceholderText } = render(<LoginPage handleSubmit={() => Promise.resolve()} />);
    const usernameOrEmailInput = getByPlaceholderText('Username or email');
    const passwordInput = getByPlaceholderText('password');

    fireEvent.change(usernameOrEmailInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect((usernameOrEmailInput as HTMLInputElement).value).toBe('testUsername');
    expect((passwordInput as HTMLInputElement).value).toBe('testPassword');
  });

  it('toggles the visibility of the password field when the visibility icon is clicked', () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginPage handleSubmit={() => Promise.resolve()} />);
    const passwordInput = getByPlaceholderText('password');
    const visibilityIcon = getByTestId('eye-icon');

    expect((passwordInput as HTMLInputElement).type).toBe('password');

    fireEvent.click(visibilityIcon);
    expect((passwordInput as HTMLInputElement).type).toBe('text');

    fireEvent.click(visibilityIcon);
    expect((passwordInput as HTMLInputElement).type).toBe('password');
  });

  it('submits the form when the submit button is clicked and a token is received', async () => {
    const mockAxiosPost = vi.fn().mockResolvedValue({ data: { token: 'testToken' } });
    axios.post = mockAxiosPost;

    const { getByPlaceholderText, getByText } = render(<LoginPage handleSubmit={() => Promise.resolve()} />);
    const usernameOrEmailInput = getByPlaceholderText('Username or email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Log in');

    fireEvent.change(usernameOrEmailInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', { usernameOrEmail: 'testUsername', password: 'testPassword' });
      expect(localStorage.getItem('token')).toBe('testToken');
    });
  });

  it('displays an error message if the login request fails', async () => {
    const mockAxiosPost = vi.fn().mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });
    axios.post = mockAxiosPost;

    const { getByPlaceholderText, getByText, findByText } = render(<LoginPage handleSubmit={() => Promise.resolve()} />);
    const usernameOrEmailInput = getByPlaceholderText('Username or email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Log in');

    fireEvent.change(usernameOrEmailInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await findByText('Error: Invalid credentials');
  });

  it('redirects the user to "/" on successful login', async () => {
    const mockAxiosPost = vi.fn().mockResolvedValue({ data: { token: 'testToken' } });
    axios.post = mockAxiosPost;
    
    Object.defineProperty(window, 'location', {
      value: {
        href: ''
      },
      writable: true
    });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage handleSubmit={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const usernameOrEmailInput = getByPlaceholderText('Username or email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Log in');

    fireEvent.change(usernameOrEmailInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('testToken');
      
      expect(window.location.href).toBe('');
    });
  });
});
