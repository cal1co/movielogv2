import "./App.css";
import Routes from "./routes";
import HomePageSettings from "./components/HomePageSettings";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from './AppContext';
import axios from 'axios';
import { Post, CombinedPostType } from './types/PostTypes'
import { CommentModalContext } from './CommentModalContext';
import CommentModal from "./components/CommentModal";



function App() {

  const [currLocation, setCurrLocation] = useState<string>("home");
  const [shouldShowSideBar, setShouldShowSideBar] = useState<boolean>(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  const [redirected, setRedirected] = useState<boolean>(false);


  const location = useLocation();
  const navigate = useNavigate();

  const { globalState, setGlobalState } = useContext(AppContext);
  const { parentPost, isOpen, closeModal } = useContext(CommentModalContext);

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
          
          // Check if the path matches the pattern "/:id/post/:postid"
          const postPathRegex = /^\/(\d+)\/post\/([^/]+)$/;
          const match = postPathRegex.exec(location.pathname);
          if (match) {
            return `Post`;
          }
  
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
    if (!token) {
      if (!redirected) {
        navigate("/login")
        setRedirected(true)
      };
      return
    };
    fetchUser(token)
  }
  const updateTokenValue = (token:string, image:string, username:string, displayName:string) => {
    setGlobalState((prevState) => ({
      ...prevState,
      token: token,
      profile_picture: image,
      username: username,
      display_name:displayName
    }));
  }

  const fetchUser = async (token:string) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    await axios
    .get("http://localhost:3000/api/auth/userdata", { headers })
    .then(res => {
      console.log("userinfo", res.data)
      updateTokenValue(token, res.data.profile_image, res.data.username, res.data.display_name)
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
  }, [location, isOpen]);


  const handleComment = async (post: CombinedPostType, comment: string): Promise<void> => {
    const headers = {
      Authorization: `Bearer ${globalState.token}`,
    }
    let path:string
    if (post.is_comment) {
      path = `http://localhost:8082/comment/${post.id}/comment`
    } else {
      path = `http://localhost:8082/post/${post.id}/comment`
    }
    await axios
      .post(
        path,
        {
          comment_content: comment,
        },
        { headers }
      )
      .then((res) => {
        // setPostComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseCommentModal = (): void => {
    closeModal();
  };

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
        {
          parentPost ? 
          <CommentModal
          isOpen={isOpen}
          onClose={handleCloseCommentModal}
          onSubmit={handleComment}
          post={parentPost}
          /> 
          :
          ""
        }
        <Routes />
      </div>
    </div>
  );
}

export default App;
