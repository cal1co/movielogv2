import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { AppContext } from '../src/AppContext';
import App from '../src/App'
import axios from 'axios';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

describe('Vitest', () => {
    it('vitest works', async () => { 
        expect(1 + 1).toBe(2)
    })
})

vi.mock('axios');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    const mockUseNavigate = vi.fn().mockImplementation(() => vi.fn());
    const mockUseLocation = vi.fn().mockReturnValue({ pathname: '/' });
    return {
        ...actual,
        useNavigate: mockUseNavigate,
        useLocation: mockUseLocation,
        MemoryRouter: (
            await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
          ).MemoryRouter,
    }
});

describe('App', () => {
    it('checks the token on load', async () => {
        const mockAxiosGet = vi.fn().mockResolvedValue({
          data: {
            profile_image: 'testImage',
            username: 'testUsername',
            display_name: 'testDisplayName',
          }
        });
        axios.get = mockAxiosGet;
    
        localStorage.setItem('token', 'testToken');
        
        const { rerender } = render(
          <MemoryRouter initialEntries={['/']}>
            <AppContext.Provider value={{
              globalState: { 
                token: '', 
                profile_picture: '', 
                username: '', 
                display_name: ''
              },
              setGlobalState: vi.fn()
            }}>
              <App />
            </AppContext.Provider>
          </MemoryRouter>
        );
    
        await waitFor(() => {
          expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:3000/api/auth/userdata', { headers: { Authorization: 'Bearer testToken' } });
        });
    });

    it('redirects to login if no token is found', async () => {
        // localStorage.removeItem('token')
        
        // const mockNavigate = vi.fn();
        // vi.mock('react-router-dom', () => ({
        //   useLocation: () => ({ pathname: '/login' }),
        //   useNavigate: () => mockNavigate
        // }));

        // render(
        //   <MemoryRouter initialEntries={['/']}>
        //     <AppContext.Provider value={{
        //       globalState: { 
        //         token: '', 
        //         profile_picture: '', 
        //         username: '', 
        //         display_name: '' 
        //       },
        //       setGlobalState: vi.fn()
        //     }}>
        //       <App />
        //     </AppContext.Provider>
        //   </MemoryRouter>
        // );
        // await waitFor(() => {
        //     console.log(mockNavigate.mock.calls);
        //     expect(mockNavigate).toHaveBeenCalledWith('/login');
        // })
    });

});
