import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useLocation, Link} from "react-router-dom";

import UserPanel from './UserPanel';

function UserControl (){
  return (
    <div className='userHomePage'>
      <div className='userPanel'>
            <UserPanel/>
          </div>
          <div className='userHome'>
          </div>
          <div className='footer'>

          </div>
        </div>
  );
}

export default UserControl;
  