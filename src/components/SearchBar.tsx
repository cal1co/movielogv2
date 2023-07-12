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

  const [query, setQuery] = useState(q);
  const [searched, setSearched] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"posts" | "users">("users");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const searchUrl = `${searchPath}?q=${encodeURIComponent(
      query
    )}&tab=${encodeURIComponent(activeTab)}`;
    setSearched(true)
    if (activeTab === "users") {
      // <UserResultsComponent query={query}/>
    }
  };

  const searchWithTabSelect = (tab: string): void => {
    const searchUrl = `${searchPath}?q=${encodeURIComponent(
      query
    )}&tab=${encodeURIComponent(tab)}`;
    // navigate(searchUrl);
  };

  const handlePostsTabClick = (): void => {
    setActiveTab("posts");
    // searchWithTabSelect("films");
  };

  const handleUsersTabClick = (): void => {
    setActiveTab("users");
    // searchWithTabSelect("users");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="tab-container">
          <div
            className={`tab ${activeTab === "posts" ? "active" : ""}`}
            onClick={handlePostsTabClick}
          >
            Posts
          </div>
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={handleUsersTabClick}
          >
            Users
          </div>
        </div>
        <button type="submit">Search</button>
      </form>


      {searched 
      && 
      (activeTab === 'users' 
      && 
      <UserResultsComponent query={query}/>)
      || 
      (activeTab === 'posts'
      && 
      <PostSearchResultsComponent query={query}/>)
      }
    </div>
  );
};

export default SearchBar;
