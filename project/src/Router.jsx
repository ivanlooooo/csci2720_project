import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';

import Locations from './Admin/adminHome';
import ChooseUser from './Admin/chooseUserCRUD';

import LocCrud from './Admin/locationCRUD';
import UserCrud from './Admin/userCRUD';

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

            <Route path="/Admin" element={<Locations />} />
            <Route path="/Admin/ChooseUser" element={<ChooseUser />} />

            <Route path="/Admin/LocCrud" element={<LocCrud />} />
            <Route path="/Admin/UserCrud" element={<UserCrud />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }

}

export default Router;
