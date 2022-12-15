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


/*
function UserFav(){
    //sample
    let favloc = [
        { venue: "Happy School", location: "Sha Tin, New Territories", noOfEvents: 2, minTrafficSpeed: 20, maxTrafficSpeed: 70 },
        { venue: "Little Park", location: "Kwun Tong, Kowloon", noOfEvents: 5, minTrafficSpeed: 15, maxTrafficSpeed: 30 },
        { venue: "Big Library", location: "Causeway Bay, Hong Kong Island", noOfEvents: 3, minTrafficSpeed: 20, maxTrafficSpeed: 40 },

    ]
    
    return(
        <section id='favlocations'>
            <div className="container">
                <div className="row">
                    <div className="col favloc-col">
                        <div className='favloc-container'>
                            <table className="favloc-table">
                                <tr>
                                    <th className="columnName" id="Venue">Venue</th>
                                    <th className="columnName" id="Location">Location</th>
                                    <th className="columnName" id="NoOfEvents">No of Events</th>
                                    <th className="columnName" id="MinTrafficSpeed">Min Traffic Speed</th>
                                    <th className="columnName" id="MaxTrafficSpeed">Max Traffic Speed</th>
                                </tr>

                                {favloc.map((key) => {
                                    return (
                                        <tr>
                                            <td className="Cell" id="Venue">{key.venue}</td>
                                            <td className="Cell" id="Location">{key.location}</td>
                                            <td className="Cell" id="NoOfEvents">{key.noOfEvents}</td>
                                            <td className="Cell" id="MinTrafficSpeed">{key.minTrafficSpeed} km/h</td>
                                            <td className="Cell" id="MaxTrafficSpeed">{key.maxTrafficSpeed} km/h</td>
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
*/


export default UserFav;