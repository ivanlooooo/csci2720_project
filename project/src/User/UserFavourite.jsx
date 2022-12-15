import { useEffect, useState } from "react";

import UserPanel from './UserPanel';
import '../CSS/User/UserFavourite.css';

function UserFav() {

    let data = [
        { venue: "North District Town Hall (Auditorium)", location: "Sha Tin, New Territories", noOfEvents: 2, minTrafficSpeed: 20, maxTrafficSpeed: 70 },
        { venue: "Sha Tin Town Hall (Auditorium)", location: "Kwun Tong, Kowloon", noOfEvents: 5, minTrafficSpeed: 15, maxTrafficSpeed: 30 },
        { venue: "Hong Kong Film Archive (Cinema)", location: "Sham Shui Po, Kowloon", noOfEvents: 1, minTrafficSpeed: 25, maxTrafficSpeed: 80 },
    ]

    return (
        <div>
            <UserPanel />
            <div className='userFav'>
                {data.map((key) => {
                    return (
                        <div>
                            <div className="favItem">
                                <div>
                                    <h2>{key.venue}</h2>
                                    <p >Location: {key.location}</p>
                                </div>
                                <button>Details</button>
                                <button>Remove</button>
                            </div>
                            <br />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserFav;