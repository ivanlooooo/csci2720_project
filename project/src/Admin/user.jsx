import { useEffect, useState } from "react";

import AdminPanel from './adminPanel';
import "../CSS/Admin/userCURD.css";

function UserCURD() {
    
    let [users,setUsers] = useState(null);
    let [loading,setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // here 
        
                fetch(process.env.REACT_APP_SERVER_URL + "/userManage", {
                    method: "POST",
                    credentials: "include",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        option:'readAll',

                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        var temp =[]
                        res.forEach(element => temp.push(element));
                        setUsers(temp)
                        setLoading(false); // here 
                        
                    })
                    .catch(err => console.log("error: " + err));

    }, [])
    return (
        <div>
            <AdminPanel />
            <div className='LocCURD'>
                <h3>User CRUD</h3>
            </div>

            <div className='locCURD-content'>
                {(!loading ) && <UserCURDContent users={users} />}
                
            </div>
        </div>
    );
}


function UserCURDContent({users}){
    //sample

    const [userId, setUserId] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    let updateUser= e =>{
        e.preventDefault();
        if (userId != null){
            fetch(process.env.REACT_APP_SERVER_URL + "/userManage", {
                method: "POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    option:'update',
                    userId:userId,
                    newUsername:newUsername,
                    newPassword:newPassword,

                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.result=="success"){
                        console.log("updated");
                        window.location.reload();
                    }else{
                        alert("you have to pick one user by above button first")
                    }
                })
                .catch(err => console.log("error: " + err));
            e.target.reset();
        }else{
            
            alert("you have to pick one user by above button first")
        }
    }

    let createUser= e =>{
        e.preventDefault();
        
        fetch(process.env.REACT_APP_SERVER_URL + "/userManage", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                option:'create',
                newUsername:e.target.newUsername.value,
                newPassword:e.target.newPassword.value,
                role:e.target.role.value

            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("created")
                window.location.reload();
            })
            .catch(err => console.log("error: " + err));
        e.target.reset();
    }
    let deleteUser= (x) =>{
        //e.preventDefault();
        
        fetch(process.env.REACT_APP_SERVER_URL + "/userManage", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                option:'delete',
                userId:x
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("deleted")
                window.location.reload();
            })
            .catch(err => console.log("error: " + err));


    }
    return(
        <section id='findUser'>
            <div className="container">
                <div className="row">
                    <div className="col users-col">
                        <div className='userSearch'>
                            <table className="UserSearchResult">
                             <tbody>
                                <tr>
                                    <th className="columnName" id="Username">Username</th>
                                    <th className="columnName" id="Password">Password</th>
                                    <th className="columnName" id="role">Role</th>
                                    <th className="Update" id="update">Update</th>
                                    <th className="Delete" id="delete">Delete</th>
                                </tr>

                                {users.map((key) => {
                                    return (
                                        <tr key={key._id}>
                                            <td className="Cell" id="Username">{key.Username}</td>
                                            <td className="Cell" id="Password">{key.Password}</td>
                                            <td className="Cell" id="role">{key.role}</td>
                                            <td className="Cell"  id="update"><button onClick={()=>{setNewUsername(key.Username);setNewPassword(key.Password);setUserId(key._id)}} >Update</button></td>
                                            <td className="Cell"  id="delete"><button onClick={()=>{deleteUser(key._id)}} >Delete</button></td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                            
                            <div className='Create'>
                                <div>Create New User:</div>
                                <form onSubmit={createUser}>
                                    <label htmlFor="newUsername">Username:</label>
                                    <input type="text" name="newUsername" required></input>
                                    <label htmlFor="newPassword">Password:</label>
                                    <input type="password" name="newPassword" required></input>
                                    <label htmlFor="role">Role:</label>
                                        <select name="role" id="role" required>
                                            <option value="admin">admin</option>
                                            <option value="User">user</option>
                                        </select>
                                    <input className='loginbtn' type="submit" value="Create" />
                                </form>
                            </div>
                            <div className='update'>
                                <div>Update User:</div>
                                <form onSubmit={updateUser}>
                                    <label htmlFor="newUsername" >Username:</label>
                                    <input type="text" value={newUsername} name="newUsername" onChange={e => setNewUsername(e.target.value )} required></input>
                                    <label htmlFor="newPassword">Password:</label>
                                    <input type="password" value={newPassword} name="newPassword" onChange={e => setNewPassword(e.target.value )} required></input>
                                    <input className='loginbtn' type="submit" value="update" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserCURD;