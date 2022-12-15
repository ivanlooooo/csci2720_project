import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import '../CSS/User/UserPanel.css';

function UserPanel() {
    const [userName, setUserName] = useState('');
    //Need set user name after back end build
    return (
        <div className="topnav">
            <NavLink to="/user" activeclassname="active" end>Home</NavLink>
            <NavLink to="/User/Search" activeclassname="active">Search</NavLink>
            <NavLink to="/User/Favourite" activeclassname="active">Favourite</NavLink>
            <div className="topnav-right">
                <a className="disabled-link">Hello user</a>
                <NavLink to="/login" activeclassname="active">Logout</NavLink>
            </div>

        </div>
    )
}

export default UserPanel;