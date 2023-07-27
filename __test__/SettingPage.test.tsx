import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import SettingPage from '../src/pages/SettingPage';
import { vi } from 'vitest'
import React from 'react';


vi.mock('axios');

describe("Setting Page", () => {

    
    beforeEach(async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <SettingPage />
                </MemoryRouter>
            );
        })
    });

    test('renders settings page correctly', () => {
        const pageTitle = screen.getByText('Settings');
        expect(pageTitle).toBeInTheDocument();
    });

    test('displays profile edit component on "edit profile" click', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                username: 'TestUser',
                display_name: 'TestDisplayName',
                bio: 'TestBio',
                profile_image: 'http://localhost:3000/testprofileimage.jpg',
            },
        });
        
        const editProfileOption = screen.getByText('edit profile');
        fireEvent.click(editProfileOption);
        
        await screen.findByTestId('edit-profile');
    });

    test('displays password change component on "change your password" click', () => {
        const passwordChangeOption = screen.getByText('change your password');
        fireEvent.click(passwordChangeOption);
        
        const passwordChangeComponent = screen.getByText('Change Password');
        expect(passwordChangeComponent).toBeInTheDocument();
    });

    test('displays account information component on "account information" click', () => {
        const accountInformationOption = screen.getByText('account information');
        fireEvent.click(accountInformationOption);
        
        const accountInformationComponent = screen.getByTestId('edit-account-information');
        expect(accountInformationComponent).toBeInTheDocument();
    });

})