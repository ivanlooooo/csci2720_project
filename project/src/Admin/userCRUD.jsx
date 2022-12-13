// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//check by users

import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import '../css/admin/userCrud.css';

function UserCRUD(){
    let [role, setRole] = useState(null)
    let [user, setUser] = useState(null)
    let [crudResult, setCrudResult] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams()

    let [user_wrongUsername, setuser_wrongUsername] = useState(null);
    let [user_wrongPw, setuser_wrongPw] = useState(null);

    let userId = searchParams.get("id");
    let submitForm = e => {
    e.preventDefault();

    let fetchBody = null;
    let option= searchParams.get("option");

    // if(formValidation(e.target.name.value, e.target.password.value)) return;

    switch(option){
        case "create":
            if(formValidation(e.target.name.value, e.target.password.value)) return;
            fetchBody = JSON.stringify({ option: option, newCredential: {
                name: e.target.name.value,
                password: e.target.password.value
            } })
            alert('create success');
            break;
        case "update":
            fetchBody = JSON.stringify({ option: option, userId: userId, newCredential: {
                name: e.target.name.value,
                password: e.target.password.value
            } })
            alert('update success');
            break;
        case "delete":
            fetchBody = JSON.stringify({ option: option, userId: userId })
            alert('delete success');
            break;
        }
        if (fetchBody === null) return;

        fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: fetchBody
        })
        .then(res => res.json())
        .then(res => setCrudResult(res.result))
        .catch(err => console.log("error: "+err));
    }

    
    function formValidation(user_username, user_password){
        let user_wrongUsername = {};
        let user_wrongPw ={};
        let isValid = false;

        if(!user_username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")){
            user_wrongUsername = "false";
            isValid =true;
        }


        if(!user_password.match("^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9]*$")){
            user_wrongPw = "false";
            isValid =true;
        }

        setuser_wrongUsername(user_wrongUsername);
        setuser_wrongPw(user_wrongPw);
        return isValid;
    }

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
            method:"POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => setRole(res.role))
        .catch(err => console.log("error: "+err));

        if(userId){
            fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
                method:"POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ option: "read", userId: userId })
            })
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.log("error: "+err));
        }
    },[]) 

    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
            { role === "admin" && <CRUDContent user_wrongUsername={user_wrongUsername} user_wrongPw={user_wrongPw} user={user} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
            { (role !== "admin" && role !== null) && <WrongRole />}    
            { role === null && <LoadContent /> }
        </>   
    )
}

function LoadContent(){
    let [dotNum, setDotNum] = useState(0)
    useEffect(()=>{
        let timer = setTimeout(()=>setDotNum((dotNum+1)%4),500)
        return () => clearTimeout(timer)
    }) 
    return <h2>{"Loading" + ".".repeat(dotNum)}</h2>
}

function WrongRole(){
    return <h3>Please log in as admin</h3>
}

function CRUDContent(props){
    useEffect(()=>{
        let form = document.querySelector("form");

        if(props.user) form.querySelector("input[name=name]").value=props.user.name
        if(props.option==="read" || props.option==="delete") form.querySelectorAll("input[type=text]").forEach(ele => ele.disabled=true)
    }) 

    return(
        <section id='userSetting'>
            {
                props.crudResult === "success" &&
                <div className='row'>
                    <div className='col text-center bg-success'>
                        <h3>Update Success</h3>
                    </div>
                </div>
            } 
            
            {
                props.crudResult === "fail" && 
                <div className='row'>
                    <div className='col text-center bg-warning'>
                        <h3>Update Fail</h3>
                    </div>
                </div>
            }

                          
            <div className='container'>
                <div className='row'>
                    <div className='col userinfo-col setting-box'>
                        <h1>User: {props.option}</h1>
                    
                        <form className="setting-form" onSubmit={props.submitForm}>
                            <label htmlFor="name">Username: </label><br/>
                            <input type="text" name="name" placeholder="username"></input><br/>
                            {
                            props.user_wrongUsername === "false" && 
                            <div className='alert alert-danger' role="alert">
                                Empty field is not allowed. Please enter numbers and letters.
                            </div>
                            }

                            <label htmlFor="role">User or Admin?</label><br/>
                            <select className="dropbox" name="role" disabled>
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
                            </select><br/> 

                            {(props.option!=="read" && props.option!=="delete") && 
                            <>
                                <label htmlFor="password">Password: </label><br/>
                                <input type="password" name="password" placeholder="password"></input><br/>
                                {
                                    props.user_wrongPw === "false" && 
                                    <div className='alert alert-warning' role="alert">
                                        Empty field is not allowed. Please enter a valid password.
                                    </div>
                                }
                            </>
                            }
                            {props.option!=="read" && <input type="submit" value={props.option}/>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserCRUD;