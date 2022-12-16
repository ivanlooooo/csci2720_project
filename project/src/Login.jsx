import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './CSS/login.css';

import AdminControl from './Admin/AdminControl';
import UserControl from './User/UserControl';

function Login(){
    let [loginStatus, setlogIn] = useState(null);
    let [role,setRole] = useState(null);

    let logInPage= e =>{
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL + "/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
            .then(res => res.json())
            .then(res => {
                setlogIn(res.login)
                setRole(res.role)
                console.log(role)
                console.log(loginStatus)
            })
            .catch(err => console.log("error: " + err));
        e.target.reset();
    }

    return(
        <div className='logInPage'>
            {(loginStatus && role==="User") && <UserControl />}
            {(loginStatus && role==="admin") && <AdminControl />}
            <main>
                <header>
                    <h5>Log in page- CSCI2720 Project</h5>
                </header>
                <div className='loginBox'>
                    <form onSubmit={logInPage}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" required></input><br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" required></input><br />
                        <input className='loginbtn' type="submit" value="Login" />
                    </form>
                </div>
            </main>
        </div>
    )
}


export default Login;