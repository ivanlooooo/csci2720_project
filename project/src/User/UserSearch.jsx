import { useEffect, useState } from "react";

import UserPanel from './UserPanel';
import '../CSS/User/UserSearch.css';

function UserSearch() {

    // sample data
    let data = [
        { venue: "Happy School", location: "Sha Tin, New Territories", noOfEvents: 2, minTrafficSpeed: 20, maxTrafficSpeed: 70 },
        { venue: "Little Park", location: "Kwun Tong, Kowloon", noOfEvents: 5, minTrafficSpeed: 15, maxTrafficSpeed: 30 },
        { venue: "Big Library", location: "Causeway Bay, Hong Kong Island", noOfEvents: 3, minTrafficSpeed: 20, maxTrafficSpeed: 40 },
        { venue: "ABC Mall", location: "Admiralty, Hong Kong Island", noOfEvents: 0, minTrafficSpeed: 30, maxTrafficSpeed: 80 },
        { venue: "ABC Centre", location: "Sham Shui Po, Kowloon", noOfEvents: 1, minTrafficSpeed: 25, maxTrafficSpeed: 80 },
    ]

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    if (searchInput.length > 0) {
        data = data.filter((key) => {
            return (key.venue.match(searchInput) || key.location.match(searchInput));
        });
    }

    return (
        <div>
            <UserPanel />
            <div className='userSearch'>
                <input
                    type="search"
                    className="searchBar"
                    placeholder="Search Venue here"
                    onChange={handleChange}
                    value={searchInput}>
                </input>
                <table className="searchResult">
                    <tr>
                        <th className="columnName" id="Venue">Venue</th>
                        <th className="columnName" id="Location">Location</th>
                        <th className="ColumnName" id="NoOfEvents">No of Events</th>
                        <th className="ColumnName" id="MinTrafficSpeed">Min Traffic Speed</th>
                        <th className="ColumnName" id="MaxTrafficSpeed">Max Traffic Speed</th>
                    </tr>
                    {data.map((key) => {
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
    );
}

export default UserSearch;