import React from 'react';
import { Route, Routes as AppRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import MovieResultsPage from './pages/MovieResultsPage';
import UserResultsPage from './pages/UserResultsPage';
import NotFoundPage from './pages/NotFoundPage'

const Routes: React.FC = () => {
  return (
    <AppRoutes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/" element={<FeedPage/>} />
      <Route path="/users/:userId" element={<UserPage/>} />
      <Route path="/search/film" element={<MovieResultsPage/>} />
      <Route path="/search/user" element={<UserResultsPage/>} />
      <Route path='*' element={<NotFoundPage />}/>
    </AppRoutes>
  );
};

export default Routes;