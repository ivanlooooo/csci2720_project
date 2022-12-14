// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//check by users
//choose from normal users or admin


import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import '../CSS/Admin/Users.css';

//only for admin
function AdminOnly(){
    return <h3>Admin only, please log in as admin.</h3>
}

function Users(){
let navigate = useNavigate();
let [role, setRole] = useState(null)
let [users, setUsers] = useState(null)

let crudUser = param => navigate("crud?"+param);

useEffect(()=>{
    fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
        method:"POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(res => setRole(res.role))
    .catch(err => console.log("error: "+err));
    
    fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
        method:"POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: "readAll" })
    })
    .then(res => res.json())
    .then(res => setUsers(res))
    .catch(err => console.log("error: "+err));

    setRole("admin");
},[]) 

return(
    <>
        { role === "error" && <Navigate to="/login" /> }
        { role === "admin" && <UsersContent users={users}  crudUser={crudUser} /> }
        { (role !== "admin" && role !== null) && <AdminOnly />}
        { role === null && <LoadingContent /> }    
    </>   
)
}

function LoadingContent(){
let [dotNum, setDotNum] = useState(0)
useEffect(()=>{
    let timer = setTimeout(()=>setDotNum((dotNum+1)%4),500)
    return () => clearTimeout(timer)
}) 
return <h2>{"Loading" + ".".repeat(dotNum)}</h2>
}


function UsersContent(props){
return(

<section id='userManage'>
    <div className='container-xl'>
        <div className='row'>
            <div className='col'>
                <h1>Users List</h1>
            </div>
            <div className="col fnt-nav">
                <button type="button" className="nav-btn fnt-btn" onClick={() => props.crudUser("option=create")}>Create New User</button>
            </div>
        </div>

        <div className='row'>
            <div className='col'>
                <table className="user-table">
                    <thead>
                        <tr className="first-row">
                            <th>Username</th>
                            <th>History of Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users!=null && props.users.map((ele,i) => 
                                <tr key={i}>
                                    <td>{ele.name}</td>
                                    <td>
                                    <button type="button" className="button" onClick={() => props.crudUser("option=read&id="+ele._id)}>Read</button>
                                    <button type="button" className="button" onClick={() => props.crudUser("option=update&id="+ele._id)}>Update</button>
                                    <button type="button" className="button delete-btn" onClick={() => props.crudUser("option=delete&id="+ele._id)}>Delete</button>
                                    </td>
                                </tr>
                            )} 
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
)
}

export default Users;