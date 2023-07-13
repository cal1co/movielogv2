import "./SearchBar.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserResultsComponent from './UserResultsComponent'
import PostSearchResultsComponent from './PostSearchResultsComponent'

const searchPath = "/search";
const SearchBar = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q") ?? "";

  const [query, setQuery] = useState<string>(q);
  const [searched, setSearched] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"posts" | "users">("users");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearched(true)
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-form-input"
        />
        <div className="tab-container">
          <div
            className={`tab ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </div>
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </div>
        </div>
        {/* <button type="submit">Search</button> */}
      </form>
      <hr/>

      {searched 
      && 
      (activeTab === 'users' 
      && 
      <UserResultsComponent query={query}/>)
      || 
      
      searched 
      &&
      (activeTab === 'posts'
      && 
      <PostSearchResultsComponent query={query}/>)
      }
    </div>
  );
};

export default SearchBar;
