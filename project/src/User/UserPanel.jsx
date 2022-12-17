import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import '../CSS/User/UserPanel.css';

function UserPanel() {
    const [userName, setUserName] = useState('');
    let username = localStorage.getItem("username");

    //Need set user name after back end build
    return (
        <div className="topnav">
            {(localStorage.getItem("role")!="user") && <Navigate to="/login" replace={true} /> }
            <NavLink to="/user" activeclassname="active" end>Home</NavLink>
            <NavLink to="/User/Search" activeclassname="active">Search</NavLink>
            <NavLink to="/User/Favourite" activeclassname="active">Favourite</NavLink>
            <div className="topnav-right">
                <a className="disabled-link">Hello {username}</a>
                <NavLink to="/login" onClick={()=>{localStorage.setItem("role", ""); localStorage.setItem("username", "")}} activeclassname="active">Logout</NavLink>
            </div>

        </div>
    )
}

export default UserPanel;