import React from 'react';
import LoginPage from '../src/pages/LoginPage';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { test, vi, expect } from 'vitest';


describe('LoginPage', () => {

  test('renders login form', () => {
    const dummyMock = vi.fn()
    const { getByLabelText } = render(<LoginPage handleSubmit={dummyMock}/>);
    expect(getByLabelText(/Email or Username/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });
  
  test('handles form input', () => {
    const dummyMock = vi.fn()
    const { getByLabelText } = render(<LoginPage handleSubmit={dummyMock}/>);
    const emailInput = getByLabelText(/Email or Username/i);
    const passwordInput = getByLabelText(/Password/i);
    
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    });
    expect(emailInput).toHaveValue('user@test.com');
    
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });
    expect(passwordInput).toHaveValue('password123');
  });
  
  test('handles form submission', async () => {
    // mock any async function that would be called on form submission
    const mockSubmit = vi.fn();
    
    const { getByLabelText, getByRole } = render(<LoginPage handleSubmit={mockSubmit}/>);
    const emailInput = getByLabelText(/Email or Username/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByRole('button', { name: /Log in/i });
    
    // enter valid form data and submit
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });
    
    // assert that handleSubmit was called and the form was submitted
    expect(mockSubmit.calls.length).toBe(1);
  });

})