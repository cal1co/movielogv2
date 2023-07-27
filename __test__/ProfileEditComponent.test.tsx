import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProfileEditComponent from '../src/components/ProfileEditComponent'

let mock = new MockAdapter(axios);


describe("Profile Edit Component", () => {
    
    beforeEach(() => {
        mock.onGet("http://localhost:3000/api/auth/userdata").reply(200, {
            username: "TestUser",
            bio: "TestBio",
            display_name: "TestDisplayName",
            profile_image: "TestProfileImage",
        });
    });
    
    afterEach(() => {
        mock.reset();
    });
    
    afterAll(() => {
        mock.restore();
    });
    
    test('loads and displays profile data', async () => {
        await act(async () => {
            render(
            <MemoryRouter>
                <ProfileEditComponent />
            </MemoryRouter>
            );
        })
    
        await waitFor(() => screen.getByTestId("profile-edit-username")); 
        const usernameInput = await screen.findByLabelText(/Username:/i) as HTMLInputElement;
        const displayNameInput = await screen.findByLabelText(/Display Name:/i) as HTMLInputElement;
        const bioInput = await screen.findByLabelText(/Bio:/i) as HTMLTextAreaElement;
        const profileImage = await screen.findByAltText("profile image") as HTMLImageElement;

        expect(usernameInput.value).toBe("TestUser")
        expect(displayNameInput.value).toBe("TestDisplayName")
        expect(bioInput.value).toBe("TestBio")
        expect(profileImage.src).toBe("http://localhost:3000/TestProfileImage")
    })

    test('changes in form enables the submit button', async () => {
        await act(async () => {
            render(
            <MemoryRouter>
                <ProfileEditComponent />
            </MemoryRouter>
            );
        })
        
        await waitFor(() => screen.getByTestId("profile-edit-username")); 
        
        fireEvent.change(screen.getByTestId("profile-edit-user-input"), { target: { value: 'NewUsername' } })
            
        expect(screen.getByRole('button', { name: /Submit/i })).toBeEnabled()
    })

    test('successful submit displays success message', async () => {
        mock.onPost("http://localhost:3000/api/auth/user/update/username").reply(200);
        
        await act(async () => {
            render(
            <MemoryRouter>
                <ProfileEditComponent />
            </MemoryRouter>
            );
        })
        
        // await waitFor(() => screen.getByText(/TestUser/i))
        await waitFor(() => screen.getByTestId("profile-edit-username")); 
        
        fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'NewUsername' } })
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
        
        await waitFor(() => screen.getByText(/Changes saved successfully/i))
        
        expect(screen.getByText(/Changes saved successfully/i)).toBeInTheDocument()
    })

    // test('failed submit displays error message', async () => {
    //     mock.onPost("http://localhost:3000/api/auth/user/update/username").reply(500);
        
    //     await act(async () => {
    //         render(
    //         <MemoryRouter>
    //             <ProfileEditComponent />
    //         </MemoryRouter>
    //         );
    //     })
        
    //     // await waitFor(() => screen.getByText(/TestUser/i))
        
    //     fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'NewUsername' } })
    //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
        
    //     // await waitFor(() => screen.getByText(/Error updating profile/i))

    //     expect(screen.getByText(/Error updating profile/i)).toBeInTheDocument()
    // })

})