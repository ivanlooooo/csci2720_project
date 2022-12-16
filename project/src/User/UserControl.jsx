import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

import UserPanel from './UserPanel';
import MapSetup from './mapPage';

function UserControl() {
  return (
    <div className='userHomePage'>
      <div className="featureSection">
        <UserPanel />
      </div>
      <div className='userHome'>
        <MapSetup/>
      </div>
      <div className='footer'>
      
      </div>
    </div>
  );
}


export default UserControl;
