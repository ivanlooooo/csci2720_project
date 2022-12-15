import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './CSS/login.css';


function Login(){
    return(
        <div className='logInPage'>
            <header>
                <h5>Log in page- CSCI2720 Project</h5>
            </header>
            <main>
                {
                    Login=="false" && 
                    <div>Login Failure. Plz ensure username and account correct.</div>
                }
                <div className='loginBox'>
                    <form onSubmit={logInPage}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" onChange={e => setUserName(e.target.value)} required></input><br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} required></input><br />
                        <input className='loginbtn' type="submit" value="Login" />
                    </form>
                </div>
            </main>
        </div>
    )
}


export default Login;