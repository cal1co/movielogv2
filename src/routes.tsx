import React from 'react';
import { Route, Routes as AppRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import SearchResultsPage from './pages/SearchResultsPage';
import UserResultsPage from './pages/UserResultsPage';
import EntryDisplayPage from './pages/EntryDisplayPage';
import NotFoundPage from './pages/NotFoundPage'
import { UserLogin } from './types/UserTypes';
import { User } from './types/UserTypes';
// import { LoginPageProps, SignupPageProps } from './types/FormTypes'


const Routes: React.FC = () => {
  return (
    <AppRoutes>
      <Route path="/login" element={<LoginPage handleSubmit={function (user: UserLogin): Promise<void> {
        throw new Error('Function not implemented.');
      } }/>} />
      <Route path="/signup" element={<SignupPage handleSubmit={function (user: User): Promise<void> {
        throw new Error('Function not implemented.');
      } }/>} />
      <Route path="/" element={<FeedPage/>} />
      <Route path="/users/:userId" element={<UserPage/>} />
      <Route path="/search" element={<SearchResultsPage/>} />
      <Route path="/search/user" element={<UserResultsPage/>} />
      <Route path="/entry" element={<EntryDisplayPage/>} />
      <Route path='*' element={<NotFoundPage />}/>
    </AppRoutes>
  );
};

export default Routes;