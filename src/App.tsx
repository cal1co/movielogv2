import "./App.css";
import Routes from "./routes";
import HomePageSettings from "./components/HomePageSettings";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from './AppContext';
import axios from 'axios';


function App() {

  const [currLocation, setCurrLocation] = useState<string>("home");
  const [shouldShowSideBar, setShouldShowSideBar] = useState<boolean>(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const { globalState, setGlobalState } = useContext(AppContext);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/login":
        return "Login";
      case "/signup":
        return "Signup";
      case "/search":
        return "Search Results";
      case "/search/user":
        return "User Results";
      case "/test":
        return "S3 Test";
      case "/notifications":
        return "Notifications";
      case "/accounts/settings":
        return "Settings";
      default:
        if (location.pathname.startsWith("/")) {
          const username = location.pathname.slice(1);
          return `${username}'s profile`;
        }
        return "";
    }
  };

  const handleShouldShowSideBarOrNot = (pageLocation: string) => {
    if (pageLocation === "Login" || pageLocation == "Signup") {
      setShouldShowSideBar(false);
    } else {
      setShouldShowSideBar(true);
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    const tokenVal = globalState.token;
    console.log("token: ", tokenVal)
    if (!token) {
      // navigate("/login")
      return
    }
    fetchUser(token)
  }
  const updateTokenValue = (token:string, image:string) => {
    setGlobalState((prevState) => ({
      ...prevState,
      token: token,
      profile_picture: image
    }));
  }

  const fetchUser = async (token:string) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    await axios
    .get("http://localhost:3000/api/auth/userdata", { headers })
    .then(res => {
      updateTokenValue(token, res.data.profile_image)
      setVerifySuccess(true)
    })
    .catch(err => {
      console.log(err.data)
    })
  }

  useEffect(() => {
    const title = getPageTitle();
    setCurrLocation(title);
    handleShouldShowSideBarOrNot(title);
    checkToken()
  }, [location]);

  return (
    <div className="App">
      {shouldShowSideBar ? (
        <div className="settings">
          <HomePageSettings currLocation={currLocation} />
        </div>
      ) : (
        ""
      )}
      <div className="content-side">
        {shouldShowSideBar ? (
          <div className="location-title">{currLocation}</div>
        ) : (
          ""
        )}
        <Routes />
      </div>
    </div>
  );
}

export default App;
