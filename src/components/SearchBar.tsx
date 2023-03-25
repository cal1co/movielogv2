import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const searchPath="/search"
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'films' | 'users'>('films');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchUrl = `${searchPath}?q=${encodeURIComponent(query)}&tab=${encodeURIComponent(activeTab)}`;
    navigate(searchUrl);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="tab-container">
        <div
          className={`tab ${activeTab === 'films' ? 'active' : ''}`}
          onClick={() => setActiveTab('films')}
        >
          Films
        </div>
        <div
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
