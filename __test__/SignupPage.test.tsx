import React from 'react';
import SignupPage from '../src/pages/SignupPage';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { test, vi, expect } from 'vitest';

describe('SignupPage', () => {
  test('renders all form inputs and a submit button', () => {
    const dummyMock = vi.fn()
    const { getByLabelText, getByRole } = render(<SignupPage handleSubmit={dummyMock} />);
    const usernameInput = getByLabelText(/Username/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByRole('button', { name: /Sign up/i });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    // mock any async function that would be called on form submission
    const mockSubmit = vi.fn();

    const { getByLabelText, getByRole } = render(
      <SignupPage handleSubmit={mockSubmit} />
    );
    const usernameInput = getByLabelText(/Username/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByRole('button', { name: /Sign up/i });

    // enter valid form data and submit
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    // assert that handleSubmit was called and the form was submitted
    expect(mockSubmit).toHaveBeenCalledOnce();
  });
});
