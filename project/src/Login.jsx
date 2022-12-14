import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './CSS/login.css';

function Login(){
    let [role,setRole] = useState('');

    var objPeople = [
        {
            username: "Hannah",
            password: "Hello",
            role: "user"
        },
        {
            username: "Admin",
            password: "Admin",
            role: "Admin"
        }
    ]

   let logInPage = e =>{
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        if(username == "Hannah" && password == "Hello")  setRole('user')
   }
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