import { useEffect, useState } from "react";

import UserPanel from './UserPanel';

function UserFav() {
    return (
        <div>
            <UserPanel />
            <div className='userFav'>
            </div>
        </div>
    );
}

export default UserFav;