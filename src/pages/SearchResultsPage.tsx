// import './SearchResultsPage.css'

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import MovieResultsComponent from '../components/MovieResultsComponent';
import SearchBar from '../components/SearchBar';
import UserResultsComponent from '../components/UserResultsComponent';


const SearchResultsPage: React.FC = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [newSearch, setNewSearch] = useState<string>()

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q') ?? ''
    const tab = queryParams.get('tab') ?? ''

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const defineRenderedComponent = () => {
        if (query) {
            switch (tab) {
                case 'films':
                    return <MovieResultsComponent query={query} />
                case 'users':
                    return <UserResultsComponent query={query}/>
            };
        };
    }
    useEffect(() => {
        defineRenderedComponent()
    }, [isMounted, newSearch, query])

    return (
      <div className="SearchResultsPage">
        <SearchBar />
        {defineRenderedComponent()}
      </div>
    );
  };
  
  export default SearchResultsPage
  