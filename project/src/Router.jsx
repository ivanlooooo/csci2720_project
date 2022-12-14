// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';

import AdminHome from './Admin/adminHome';
import Events from './Admin/events';
import Users from './Admin/Users';

import EventCRUD from './Admin/eventCRUD';
import UserCrud from './Admin/userCRUD';
import AdminControl from './Admin/adminControl';

class Router extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/User" element={<UserControl />} />
            <Route path="/User/Search" element={<UserSearch />} />
            <Route path="/User/Favourite" element={<UserFav />} />

            <Route path="/Admin" element={<AdminControl />} />
            <Route path="/Admin/Home" element={<AdminHome />} />
            <Route path="/Admin/Events" element={<Events />} />
            <Route path="/Admin/Users" element={<Users />} />

            <Route path="/Admin/LocCrud" element={<EventCRUD />} />
            <Route path="/Admin/UserCrud" element={<UserCrud />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }

}

export default Router;
