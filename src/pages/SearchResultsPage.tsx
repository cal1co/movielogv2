// import './SearchResultsPage.css'

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import MovieResultsComponent from '../components/MovieResultsComponent';
import SearchBar from '../components/SearchBar';
import UserResultsComponent from '../components/UserResultsComponent';


const SearchResultsPage: React.FC = () => {

    const [isMounted, setIsMounted] = useState(false);
    // const [query, setQuery] = useState<string>()
    // const [tab, setTab] = useState<string>()
    const [newSearch, setNewSearch] = useState<string>()

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q') ?? ''
    const tab = queryParams.get('tab') ?? ''

    useEffect(() => {
        setIsMounted(true);
    }, [])

    let resultComponent;
    const defineRenderedComponent = () => {
        if (query) {
            switch (tab) {
                case 'films':
                    return <MovieResultsComponent query={query} />
                    break;
                case 'users':
                    return <UserResultsComponent query={query}/>
                    break;
            };
        };
    }
    useEffect(() => {
        defineRenderedComponent()
    }, [isMounted, newSearch, query])

    const handleSearch = (term:string):void => {
        console.log("FROM CHILD ", term)
        setNewSearch(term)
    }

    return (
      <div className="SearchResultsPage">
        <SearchBar onSearch={handleSearch} />
        {defineRenderedComponent()}
      </div>
    );
  };
  
  export default SearchResultsPage
  