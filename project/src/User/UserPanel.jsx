import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom";
import { useEffect, useState,R } from "react";

import '../CSS/User/UserPanel.css';

function UserPanel(){
    const [ userName, setUserName ] = useState('');
    //Need set user name after back end build
    return(
        <div className="topnav">
            <a className="active" href="/user">Home</a>
            <a href="/User/Search">Search</a>
            <a href="/User/Favourite">Favourite</a>
            <div className="topnav-right">
                <a >Hello user</a>
                <a href="/login">Logout</a>
            </div>
        </div>
    )
}

export default UserPanel;