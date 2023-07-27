import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserPage from '../src/pages/UserPage';
import { vi } from 'vitest'
import React from 'react';

vi.mock('axios');

const mockHistoryPush = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useParams: () => ({
          username: 'testuser',
        }),
        useNavigate: () => mockHistoryPush,
    }
});

describe('UserPage Component', () => {
  beforeEach( async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        user: {
          id: 1,
          username: 'testuser',
          display_name: 'Test User',
          bio: 'This is a test user',
          profile_image: 'http://localhost:3000/testprofileimage.jpg',
          active_account: true,
          follow_data: {
            follower_count: 0,
            following_count: 0,
          },
        },
        same_user: true,
        following: false,
      },
    });
    axios.get.mockResolvedValueOnce({
      data: [
        {
          post_id: '1',
          post_content: 'This is a test post',
        },
      ],
    });
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/user/testuser']}>
                <UserPage />
            </MemoryRouter>
        );
    })
  });

  it('renders UserPage correctly', async () => {
    const usernameElement = await screen.findByText('@testuser');
    expect(usernameElement).toBeInTheDocument();

    const displayNameElement = screen.getByTestId('user-more-info-display-name');
    expect(displayNameElement).toBeInTheDocument();
    expect(displayNameElement.textContent).toBe('Test User')

    const bioElement = screen.getByText('This is a test user');
    expect(bioElement).toBeInTheDocument();
  });

  it('calls navigate function on settings button click', async () => {
    const gearElement = await screen.findByTestId("user-settings-button");
    fireEvent.click(gearElement);
    expect(mockHistoryPush).toHaveBeenCalledWith('/accounts/settings');
  });

  it('displays posts correctly', async () => {
    const postElement = await screen.findByText('This is a test post');
    expect(postElement).toBeInTheDocument();
  });
});
