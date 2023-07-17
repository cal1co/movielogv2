import "./App.css";
import Routes from "./routes";
import HomePageSettings from "./components/HomePageSettings";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [currLocation, setCurrLocation] = useState<string>("home");
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/login':
        return 'Login';
      case '/signup':
        return 'Signup';
      case '/search':
        return 'Search Results';
      case '/search/user':
        return 'User Results';
      case '/test':
        return 'S3 Test';
      case '/accounts/settings':
        return 'Settings';
        default:
          if (location.pathname.startsWith('/')) {
            const username = location.pathname.slice(1); 
            return `${username}'s profile`; 
          }
          return '';
    }
  }

  return (
    <div className="App">
      <div className="settings">
        <HomePageSettings />
      </div>
      <div className="content-side">
        <div className="location-title">{getPageTitle()}</div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
