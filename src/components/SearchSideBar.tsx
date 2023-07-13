import React from 'react';
import './SearchSideBar.css'
import SearchBar from '../components/SearchBar'

function SearchSidebar() {

    return (
        <div className="search-sidebar">
            <div className="search-title-wrapper">
                <div className="search-title">
                    Search
                </div>
            </div>
            <SearchBar></SearchBar>
        </div>
    )

}

export default SearchSidebar;