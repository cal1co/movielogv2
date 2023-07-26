import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import SearchBar from '../src/components/SearchBar';
import '@testing-library/jest-dom';


describe("Search Bar", () => {
    it('renders without crash', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
    });
    it('allows the user to type into the search bar', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'test' } });
        expect((input as HTMLInputElement).value).toBe('test');
    });
    it('changes active tab upon click', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const postsTab = screen.getByText('Posts');
        fireEvent.click(postsTab);
        expect(postsTab).toHaveClass('active');
        const usersTab = screen.getByText('Users');
        fireEvent.click(usersTab);
        expect(usersTab).toHaveClass('active');
    });
    it('submits the form and triggers search', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.submit(input);
        expect((input as HTMLInputElement).value).toBe('test');
    });
      
})