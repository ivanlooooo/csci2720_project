import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState, R } from "react";

import '../CSS/User/UserPanel.css';

function UserPanel() {
    const [userName, setUserName] = useState('');
    //Need set user name after back end build
    return (
        <div className="topnav">
            <Link className="active" to="/User">Home</Link>
            <Link to="/User/Search">Search</Link>
            <Link to="/User/Favourite">Favourite</Link>
            <div className="topnav-right">
                <a >Hello user</a>
                <Link to="/Login">Logout</Link>
            </div>
        </div>
    )
}

export default UserPanel