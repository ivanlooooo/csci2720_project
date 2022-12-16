import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';
import AdminPanel from './adminPanel';
import LocCURD from './location';
import { useLocation } from 'react-router-dom';

function AdminControl() {
  return (
    <div className='userHomePage'>
      <div className="featureSection">
        <AdminPanel  />
      </div>
      <div className='userHome'>
        <LocCURD  />
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}


export default AdminControl;