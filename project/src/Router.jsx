import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Login from './Login';
import UserControl from './User/UserControl';
import UserFav from './User/UserFavourite';
import UserSearch from './User/UserSearch';

class Router extends React.Component{
  render(){
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/User" element={<UserControl/>}/>
              <Route path="/User/Search" element={<UserFav/>}/>
              <Route path="/User/Favourite" element={<UserFav/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  } 

}

export default Router;
