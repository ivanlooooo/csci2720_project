import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

import Login from '../Login';
import UserPanel from './UserPanel';
import GoogleMap from './Map';

function UserControl() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className='userHomePage'>
      <div className="featureSection">
        <UserPanel />
      </div>
      <div className='userHome'>
        <GoogleMap />
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}


export default UserControl;
