import React, { useState, useEffect } from "react";
import "./HomePageSettings.css";
import yuzu from "../../icons/lemon-regular.svg";
import home from "../../icons/house-chimney-window-regular.svg";
import homeSelected from "../../icons/house-chimney-window-solid.svg";
import search from "../../icons/magnifying-glass-regular.svg";
import searchSelected from "../../icons/magnifying-glass-solid.svg";
import notifications from "../../icons/mailbox-regular.svg";
import notificationsSelected from "../../icons/mailbox-solid.svg";
import bookmark from "../../icons/book-bookmark-regular.svg";
import bookmarkSelected from "../../icons/book-bookmark-solid.svg";
import dms from "../../icons/comment-regular.svg";
import user from "../../icons/user-regular.svg";
import hamburger from "../../icons/bars-regular.svg";
import hamburgerSelected from "../../icons/bars-regular-solid.svg";
import { useNavigate, useLocation } from "react-router-dom";

import SearchSidebar from "./SearchSideBar";

interface ChildComponentProps {
  currLocation: string;
}

const HomePageSettings: React.FC<ChildComponentProps> = ({ currLocation }) => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [selectedBeforeSearch, setSelectedBeforeSearch] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const location = useLocation();

  useEffect(() => {
    setSelected(currLocation);
    console.log(currLocation);
  }, [currLocation]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (selected !== "Search") {
      setSelectedBeforeSearch(selected);
      setSelected("Search");
      setSearchOpen(true)
    } else {
      setSearchOpen(false)
      setSelected(selectedBeforeSearch);
    }
  };

  const handleSelect = (targetLocation:string):void => {
    setSidebarOpen(false)
    if (targetLocation === location.pathname) {
      setSelected(currLocation)
      return
    } 
    navigate(targetLocation)
  }

  return (
    <div className="HomePageSettings">
      <div className="settings-wrapper">
        <div className="yuzu" onClick={() => handleSelect("/")}>
          <div className="setting-option">
            <img src={yuzu} alt="yuzu icon lemon" className="yuzu-icon icon" />
            <div className="icon-description yuzu-logo">YUZU</div>
          </div>
        </div>

        <div className="home setting-option" onClick={() => handleSelect("/")}>
          <div className="setting-option">
            {selected === "Home" ? (
              <img
                src={homeSelected}
                alt="home icon house"
                className="home-icon icon"
              />
            ) : (
              <img
                src={home}
                alt="home icon house"
                className="home-icon icon"
              />
            )}
            <div className="icon-description">home</div>
          </div>
        </div>
        <div className="search setting-option" onClick={toggleSidebar}>
          <div className="setting-option">
            {selected === "Search" && sidebarOpen ? (
              <img
                src={searchSelected}
                alt="search icon magnifying glass"
                className="search-icon icon"
              />
            ) : (
              <img
                src={search}
                alt="search icon magnifying glass"
                className="search-icon icon"
              />
            )}
            <div className="icon-description">search</div>
          </div>
        </div>
        <div
          className="notifications setting-option"
          onClick={() => handleSelect("/notifications")}
        >
          <div className="setting-option">
            {selected === "Notifications" ? (
              <img
                src={notificationsSelected}
                alt="notification icon bell"
                className="notifications-icon icon"
              />
            ) : (
              <img
                src={notifications}
                alt="notification icon bell"
                className="notifications-icon icon"
              />
            )}
            <div className="icon-description">notifications</div>
          </div>
        </div>
        <div className="bookmarks setting-option">
          {selected === "Bookmarks" ? (
            <img
              src={bookmarkSelected}
              alt="bookmarks icon book"
              className="bookmarks-icon icon"
            />
          ) : (
            <img
              src={bookmark}
              alt="bookmarks icon book"
              className="bookmarks-icon icon"
            />
          )}
          <div className="icon-description">bookmarks</div>
        </div>
        <div className="direct-messages setting-option">
          <img
            src={dms}
            alt="direct message message bubbles"
            className="dms-icon icon"
          />
          <div className="icon-description">direct messages</div>
        </div>
        <div className="profile">
          <div className="setting-option">
            <img src={user} alt="user icon person" className="user-icon icon" />
            <div className="icon-description">profile</div>
          </div>
        </div>

        <div className="more">
          <div className="setting-option options-button-hamburger">
            <img
              src={hamburger}
              alt="more icon three stacked lines"
              className="more-icon icon"
            />
            <div className="icon-description">more</div>
          </div>
        </div>
      </div>
      <div className={`search-wrapper ${sidebarOpen ? "open" : "hidden"}`}>
        <SearchSidebar />
      </div>
    </div>
  );
};

export default HomePageSettings;
