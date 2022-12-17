import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import '../CSS/User/UserPanel.css';

function AdminPanel() {
    let username = localStorage.getItem("username");

    return (
        <div className="topnav">
            
            {(localStorage.getItem("role")!="admin") && <Navigate to="/login" replace={true} /> }
            <NavLink to="/admin" activeclassname="active" end>Location</NavLink>
            <NavLink to="/admin/userCRUD" activeclassname="active">User</NavLink>
            <div className="topnav-right">
                <a className="disabled-link">Hello {username}</a>
                <NavLink onClick={()=>{localStorage.setItem("role", ""); localStorage.setItem("username", "")}} to="/login" activeclassname="active">Logout</NavLink>
            </div>

        </div>
    )
}

export default AdminPanel;