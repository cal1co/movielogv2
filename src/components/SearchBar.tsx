import "./SearchBar.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserResultsComponent from './UserResultsComponent'

const searchPath = "/search";
const SearchBar = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q") ?? "";
  // const tab = queryParams.get('tab') ?? ''

  const [query, setQuery] = useState(q);
  const [searched, setSearched] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"films" | "tv" | "users">("films");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const searchUrl = `${searchPath}?q=${encodeURIComponent(
      query
    )}&tab=${encodeURIComponent(activeTab)}`;
    // navigate(searchUrl);
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

  const handleFilmsTabClick = (): void => {
    setActiveTab("films");
    searchWithTabSelect("films");
  };

  const handleUsersTabClick = (): void => {
    setActiveTab("users");
    searchWithTabSelect("users");
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
            className={`tab ${activeTab === "films" ? "active" : ""}`}
            onClick={handleFilmsTabClick}
          >
            Films
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


      {searched && <UserResultsComponent query={query}/>}
    </div>
  );
};

export default SearchBar;
