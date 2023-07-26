import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePageSettings from '../src/components/HomePageSettings';
import { AppContext } from '../src/AppContext';
import '@testing-library/jest-dom';
import { vi } from 'vitest'

const mockContext = {
    globalState: { 
      token: '', 
      profile_picture: '', 
      username: 'test', 
      display_name: '' 
    },
    setGlobalState: vi.fn()
  };

describe("HomePageSettingsComponent", () => {

    it('renders without crash', () => {
        render(
            <Router>
            <AppContext.Provider value={mockContext}>
            <HomePageSettings currLocation="/" />
            </AppContext.Provider>
        </Router>
        );
    });
    
    it('opens and closes sidebar when search icon is clicked', async () => {
        const { getByTestId } = render(
          <Router>
            <AppContext.Provider value={mockContext}>
              <HomePageSettings currLocation="/" />
            </AppContext.Provider>
          </Router>
        );
      
        const searchIcon = getByTestId('search-icon-wrapper');
        fireEvent.click(searchIcon);
      
        await waitFor(() => {
          expect(getByTestId('search-wrapper')).toHaveClass('open');
        });
      
        fireEvent.click(searchIcon);
      
        await waitFor(() => {
          expect(getByTestId('search-wrapper')).not.toHaveClass('open');
        });
      });
      
})