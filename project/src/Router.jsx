// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';
import SingleLocation from './User/eachLoc';

import AdminControl from './Admin/AdminControl';
import UserCRUD from './Admin/user';
import LocCRUD from './Admin/locationCRUD';
import eventCRUD from './Admin/event';

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
            <Route path="/location" element={<SingleLocation  />} />

            <Route path="/Admin" element={<AdminControl />} />
            <Route path="/Admin/userCRUD" element={<UserCRUD />} />
            <Route path="/Admin/crud" element={<LocCRUD />} />
            <Route path="/Admin/eventCRUD" element={<eventCRUD />} />
          </Routes>
        </BrowserRouter>

        
    );
  }

}

export default Router;
