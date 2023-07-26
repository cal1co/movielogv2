import { render, fireEvent, waitFor } from '@testing-library/react';
import PostSearchResultsComponent from '../src/components/PostSearchResultsComponent';
import axios from 'axios';
import React from 'react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('axios');

const mockAxiosGet = vi.fn();

describe('PostSearchResultsComponent', () => {
  beforeEach(() => {
    axios.get = mockAxiosGet;
    localStorage.setItem('token', 'testToken');
  });

  it('fetches and displays posts', async () => {
    mockAxiosGet.mockResolvedValue({ 
      data: [
        { id: '1', post_content: 'post1' },
        { id: '2', post_content: 'post2' },
      ] 
    });

    const { getByText, findByText } = render(
      <MemoryRouter>
        <PostSearchResultsComponent query="testQuery" />
      </MemoryRouter>
    );

    // await findByText('Loading...');

    expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:3000/api/auth/search/post/testQuery', {
      headers: {
        'Authorization': `Bearer testToken`,
        'Content-Type': 'application/json'
      }
    });
    
    await waitFor(() => {
      expect(getByText('post1')).toBeInTheDocument();
      expect(getByText('post2')).toBeInTheDocument();
    });
  });

//   it('displays an error message if the fetch request fails', async () => {
//     mockAxiosGet.mockRejectedValue({ response: { data: { message: 'Fetch failed' } } });

//     const { getByText } = render(
//       <MemoryRouter>
//         <PostSearchResultsComponent query="testQuery" />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(getByText('Fetch failed')).toBeInTheDocument();
//     });
//   });
});
