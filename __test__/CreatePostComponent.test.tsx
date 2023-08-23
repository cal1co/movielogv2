import { render, fireEvent, waitFor } from '@testing-library/react';
import CreatePostComponent from '../src/components/CreatePostComponent'
import axios from 'axios';
import React from 'react';
import { vi } from 'vitest'
import { Router, useNavigate, MemoryRouter } from 'react-router-dom';
import { AppContext } from "../src/AppContext";

vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const originalModule = vi.importActual('react-router-dom');
  return {
    ...originalModule,
    MemoryRouter: (await vi.importActual<typeof import('react-router-dom')>('react-router-dom')).MemoryRouter,
    useNavigate: () => vi.fn(), 
  }
});



describe('CreatePostComponent', () => {
  const onNewPost = vi.fn();
  const setGlobalState = vi.fn();
  const globalState = {
    profile_picture: 'test.jpg',
    token: '',
    username: '', 
    display_name: ''
  };
  
  it('updates the text on user input', () => {
    const { getByPlaceholderText } = render(
      <AppContext.Provider value={{globalState, setGlobalState}}>
        <CreatePostComponent onNewPost={onNewPost} />
      </AppContext.Provider>
    );
    const textArea = getByPlaceholderText('wazzup?');

    fireEvent.change(textArea, { target: { value: 'testPost' } });

    expect((textArea as HTMLTextAreaElement).value).toBe('testPost');
  });

  it('uploads file on file change', async () => {
    const { getByTestId } = render(
      <AppContext.Provider value={{globalState, setGlobalState}}>
        <CreatePostComponent onNewPost={onNewPost} />
      </AppContext.Provider>
    );
    const inputFile = getByTestId('image-upload');

    const file = new File(['dummy content'], 'example.png', {type: 'image/png'});
    fireEvent.change(inputFile, { target: { files: [file] } });

    await waitFor(() => {
        expect((inputFile as HTMLInputElement).files[0]).toBe(file);
    });
  });

  it('submits the post when the post button is clicked', async () => {
    const mockAxiosPost = vi.fn().mockResolvedValue({ data: { post_id: '1' } });
    axios.post = mockAxiosPost;

    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={{globalState, setGlobalState}}>
        <CreatePostComponent onNewPost={onNewPost} />
      </AppContext.Provider>
    );
    const textArea = getByPlaceholderText('wazzup?');
    const submitButton = getByText('Post');

    fireEvent.change(textArea, { target: { value: 'testPost' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        expect(mockAxiosPost).toHaveBeenCalledWith(`${import.meta.env.VITE_YUZU_POST_HANDLER}/post`, { post_content: 'testPost' }, { headers });
    });
  });
});
