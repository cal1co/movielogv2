import React from "react";
import { Route, Routes as AppRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import UserPage from "./pages/UserPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { UserLogin } from "./types/UserTypes";
import { User } from "./types/UserTypes";
import PostRenderPage from "./pages/PostRenderPage";
import S3TestPage from "./pages/S3TestPage";
import SettingPage from "./pages/SettingPage";
import HomePageSettings from "./components/HomePageSettings";

const Routes: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <AppRoutes>
      <Route
        path="/login"
        element={
          <LoginPage
            handleSubmit={function (user: UserLogin): Promise<void> {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            handleSubmit={function (user: User): Promise<void> {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
      <Route
        path="/"
        element={
          // ?
          <FeedPage />
          // :
          // <LoginPage handleSubmit={function (user: UserLogin): Promise<void> {
          // throw new Error('Function not implemented.');
          // } }/>
        }
      />
      <Route path="/:username" element={<UserPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/:username/post/:postId" element={<PostRenderPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/test" element={<S3TestPage />} />
      <Route path="/accounts/settings" element={<SettingPage />} />
      <Route path="/s3test" element={<S3TestPage />} />
    </AppRoutes>
  );
};

export default Routes;
