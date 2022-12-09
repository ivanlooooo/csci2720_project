import {Link, Outlet} from "react-router-dom";
import { useEffect, useState } from "react";

function UserPanel(){
    const [ userName, setUserName ] = useState('');
    //Need set user name after back end build
    //setUserName('Hannah');
    return(    
    <div>
        <nav className="user">
            <Link to='user/home'>
                <h5 > 'Hannah'</h5>
            </Link>
            <div className="nav-links" id='navLinks'>
                <ul>
                    <li>Home</li>
                    <li>favourite</li>
                    <li >LogOut</li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default UserPanel;