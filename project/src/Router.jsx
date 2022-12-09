import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import UserControl from './User/UserControl';

class Router extends React.Component{
  render(){
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/User" element={<UserControl/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  } 

}

export default Router;
