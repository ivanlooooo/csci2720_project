import { useEffect, useState } from "react";

import AdminPanel from './adminPanel';
import "../CSS/Admin/userCURD.css";

function UserCURD() {
    return (
        <div>
            <AdminPanel />
            <div className='LocCURD'>
                <h3>User CRUD</h3>
            </div>

            <div className='locCURD-content'>
                <UserCURDContent />
            </div>
        </div>
    );
}


function UserCURDContent(){
    //sample
    let users = [
        { username: "Amy", password: "amy123", favourite: 2, role: "user" },
        { username: "Ben", password: "zebra123", favourite: 5, role: "user" },
        { username: "Joyce", password: "happy456", favourite: 6, role: "admin" },
        { username: "Kelly", password: "fun789", favourite: 3, role: "admin"},
        { username: "Jane", password: "cool123", favourite: 9, role: "user" },
    ]

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (person) => {
        setSearchInput(person.target.value);
    };
    

    if (searchInput.length > 0) {
        users = users.filter((key) => {
            return (key.username.match(searchInput) || key.password.match(searchInput) || key.role.match(searchInput));
        });
    }


    return(
        <section id='findUser'>
            <div className="container">
                <div className="row">
                    <div className="col users-col">
                        <div className='userSearch'>
                            <input type="search" className="UserSearchBar" placeholder="Search User here"
                                onChange={handleChange}
                                value={searchInput}>
                            </input>
                            <table className="UserSearchResult">
                                <tr>
                                    <th className="columnName" id="Username">Username</th>
                                    <th className="columnName" id="Password">Password</th>
                                    <th className="columnName" id="favourite">Favourite</th>
                                    <th className="columnName" id="role">Role</th>
                                </tr>

                                {users.map((key) => {
                                    return (
                                        <tr>
                                            <td className="Cell" id="Username">{key.username}</td>
                                            <td className="Cell" id="Password">{key.password}</td>
                                            <td className="Cell" id="favourite">{key.favourite}</td>
                                            <td className="Cell" id="role">{key.role}</td>
                                        </tr>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserCURD;