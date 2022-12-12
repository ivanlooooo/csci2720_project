import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';

class Router extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/User" element={<UserControl />} />
            <Route path="/User/Search" element={<UserSearch />} />
            <Route path="/User/Favourite" element={<UserFav />} />
          </Routes>
        </BrowserRouter>
    );
  }

}

export default Router;
