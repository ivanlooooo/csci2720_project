import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';

// google map demo
import GoogleMap from './google_map/google_map'

class Router extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/User" element={<UserControl />} />
            <Route path="/User/Search" element={<UserSearch />} />
            <Route path="/User/Favourite" element={<UserFav />} />

            {/* this is a google map demo */}
            <Route path="/googlemap" element={<GoogleMap />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }

}

export default Router;
