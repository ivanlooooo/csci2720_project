import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import '../CSS/User/UserPanel.css';

function UserPanel() {
    const [userName, setUserName] = useState('');
    //Need set user name after back end build
    return (
        <div className="topnav">
            <NavLink to="/admin" activeclassname="active" end>Location</NavLink>
            <NavLink to="/admin/userCRUD" activeclassname="active">User</NavLink>
            <div className="topnav-right">
                <a className="disabled-link">Hello Admin</a>
                <NavLink to="/login" activeclassname="active">Logout</NavLink>
            </div>

        </div>
    )
}

export default UserPanel;