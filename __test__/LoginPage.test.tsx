import React from 'react';
import { test, expect, describe, vi, afterEach} from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import LoginPage from '../src/pages/LoginPage';

// afterEach(async () => {
//     await clearTestingData()
// })

describe('LoginPage', () => {
    test('login form renders', async () => {
        render(<LoginPage />);
        const form = screen.getByRole('form');
        expect(form).toBeTruthy();
    });
    test('should update email input value on change', () => {
        const { getByLabelText } = render(<LoginPage />);
        const emailInput = getByLabelText('Email or Username:');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });
    
      test('should update password input value on change', () => {
        const { getByLabelText } = render(<LoginPage />);
        const passwordInput = getByLabelText('Password:');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
      });
    
    //   test('should display error message if username is not unique', async () => {
    //     // mock implementation for onSubmit function that always returns a non-unique username error message
    //     const mockOnSubmit = vi.fn().mockImplementation(() => {
    //       throw new Error('non-unique username');
    //     });
    
    //     const { getByLabelText, getByText } = render(<LoginPage onLogin={mockOnSubmit} />);
    //     const emailInput = getByLabelText('Email or Username:');
    //     const passwordInput = getByLabelText('Password:');
    //     const submitButton = getByText('Log in')[0];
    
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //     fireEvent.click(submitButton);
    
    //     await waitFor(() => {
    //       expect(mockOnSubmit).toHaveBeenCalled();
    //       const errorMessage = getByText('non-unique username');
    //       expect(errorMessage).toBeInTheDocument();
    //     });
    //   });
    
    //   test('should call onSubmit function with correct arguments on form submission', async () => {
    //     const mockOnSubmit = jest.fn();
    
    //     const { getByLabelText, getByText } = render(<LoginPage onLogin={mockOnSubmit} />);
    //     const emailInput = getByLabelText('Email or Username:');
    //     const passwordInput = getByLabelText('Password:');
    //     const submitButton = getByText('Log in');
    
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //     fireEvent.click(submitButton);
    
    //     await waitFor(() => {
    //       expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
    //     });
    //   });
})


// test('email input changes state', async() => {
//     const { container } = render(<LoginPage/>);
//     const input = container.getElementsByClassName('#email');
//     await input.type('test@example.com');
//     const value = await page.$eval('#email', (el) => el.value);
//     expect(value).toBe('test@example.com');
// });

// test('password input changes state', async () => {
//   render(<LoginPage/>);
//   const input = await page.$('#password');
//   await input.type('password');
//   const value = await page.$eval('#password', (el) => el.value);
//   expect(value).toBe('password');
// });

// test('error message displays when form is submitted with no email or password', async () => {
//   render(<LoginPage/>);
//   const form = await page.$('form');
//   await form?.evaluate((form) => form.submit());
//   const errorMessage = await page.$('p');
//   expect(errorMessage).toBeTruthy();
// });

// test('error message displays when form is submitted with incorrect email and password', async () => {
//   render(<LoginPage/>);
//   const form = await page.$('form');
//   await page.fill('#email', 'wrong@example.com');
//   await page.fill('#password', 'wrongpassword');
//   await form?.evaluate((form) => form.submit());
//   const errorMessage = await page.$('p');
//   expect(errorMessage).toBeTruthy();
// });

// test('form submits when email and password are correct', async () => {
//   render(<LoginPage/>);
//   const form = await page.$('form');
//   await page.fill('#email', 'test@example.com');
//   await page.fill('#password', 'password');
//   await form?.evaluate((form) => form.submit());