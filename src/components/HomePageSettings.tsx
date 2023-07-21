import React, { useState, useEffect } from "react";
import "./HomePageSettings.css";
import { ReactComponent as Yuzu } from "../../icons/lemon-regular.svg";
import { ReactComponent as Home } from "../../icons/house-chimney-window-regular.svg";
import { ReactComponent as HomeSelected } from "../../icons/house-chimney-window-solid.svg";
import { ReactComponent as Search } from "../../icons/magnifying-glass-regular.svg";
import { ReactComponent as SearchSelected } from "../../icons/magnifying-glass-solid.svg";
import { ReactComponent as Notifications } from "../../icons/mailbox-regular.svg";
import { ReactComponent as NotificationsSelected } from "../../icons/mailbox-solid.svg";
import { ReactComponent as Bookmark } from "../../icons/book-bookmark-regular.svg";
import { ReactComponent as BookmarkSelected } from "../../icons/book-bookmark-solid.svg";
import { ReactComponent as Dms } from "../../icons/comment-regular.svg";
import { ReactComponent as User } from "../../icons/user-regular.svg";
import { ReactComponent as Hamburger } from "../../icons/bars-regular.svg";
import { ReactComponent as HamburgerSelected } from "../../icons/bars-regular-solid.svg";
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
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setSelected(currLocation);
  }, [currLocation]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (selected !== "Search") {
      setSelectedBeforeSearch(selected);
      setSelected("Search");
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
      setSelected(selectedBeforeSearch);
    }
  };

  const handleSelect = (targetLocation: string): void => {
    setSidebarOpen(false);
    if (targetLocation === location.pathname) {
      setSelected(currLocation);
      return;
    }
    navigate(targetLocation);
  };

  const handleMoreIconClick = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else if (document.body.classList.contains("light")) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }

  return (
    <div className="HomePageSettings">
      <div className="settings-wrapper">
        <div className="yuzu" onClick={() => handleSelect("/")}>
          <div className="setting-option">
            <Yuzu className="yuzu-icon icon" />
            <div className="icon-description yuzu-logo">YUZU</div>
          </div>
        </div>

        <div className="home icon-wrapper" onClick={() => handleSelect("/")}>
          <div className="setting-option">
            {selected === "Home" ? (
              <HomeSelected className="home-icon icon" />
            ) : (
              <Home className="home-icon icon" />
            )}
            <div className="icon-description">home</div>
          </div>
        </div>
        <div className="search icon-wrapper" onClick={toggleSidebar}>
          <div className="setting-option">
            {selected === "Search" && sidebarOpen ? (
              <SearchSelected className="search-icon icon" />
            ) : (
              <Search className="search-icon icon" />
            )}
            <div className="icon-description">search</div>
          </div>
        </div>
        <div
          className="notifications icon-wrapper"
          onClick={() => handleSelect("/notifications")}
        >
          <div className="setting-option">
            {selected === "Notifications" ? (
              <NotificationsSelected className="notifications-icon icon" />
            ) : (
              <Notifications className="notifications-icon icon" />
            )}
            <div className="icon-description">notifications</div>
          </div>
        </div>
        <div className="bookmarks icon-wrapper">
          <div className="setting-option">
            {selected === "Bookmarks" ? (
              <BookmarkSelected className="bookmarks-icon icon" />
            ) : (
              <Bookmark className="bookmarks-icon icon" />
            )}
            <div className="icon-description">bookmarks</div>
          </div>
        </div>
        <div className="direct-messages icon-wrapper">
          <div className="setting-option">
            <Dms className="dms-icon icon" />
            <div className="icon-description">direct messages</div>
          </div>
        </div>
        <div className="profile icon-wrapper">
          <div className="setting-option">
            <User className="user-icon icon" />
            <div className="icon-description">profile</div>
          </div>
        </div>

        <div className="more icon-wrapper" onClick={handleMoreIconClick}>
          <div className="setting-option options-button-hamburger">
            <Hamburger className="more-icon icon" />
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
