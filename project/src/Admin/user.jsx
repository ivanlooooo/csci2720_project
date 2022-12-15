import { useEffect, useState } from "react";

import AdminPanel from './adminPanel';

function UserCURD() {
    return (
        <div>
            <AdminPanel />
            <div className='LocCURD'>
                <h3>Location CRUD</h3>
            </div>
        </div>
    );
}

export default UserCURD;