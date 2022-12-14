// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)



import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState, R } from "react";

import '../CSS/User/UserPanel.css';

function AdminPanel(){
    const [userName, setUserName] = useState('');
    
    // !! Need set user name after back end build 

    // useEffect(() => {
    //     fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
    //         method:"POST",
    //         credentials: "include",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ option: "readByCookie" })
    //     })
    //     .then(res => res.json())
    //     .then(res => setUsername(res.name))
    // },[])
    
    return(
        <div className="topnav">
            <Link className="active" to="/Admin/Home">Home</Link>
            <Link to="/Admin/Events">Events</Link>
            <Link to="/Admin/Users">Users</Link>
            <div className="topnav-right">
                <a >Hello Admin</a>
                <Link to="/Login">Logout</Link>
            </div>
        </div>
    )
}

export default AdminPanel;
