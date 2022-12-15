import { useEffect, useState } from "react";

import UserPanel from './UserPanel';
import '../CSS/User/UserSearch.css';

function UserSearch() {

    // sample data
    let raw_data = [
        { venue: "Happy School", location: "Sha Tin, New Territories", noOfEvents: 2, minTrafficSpeed: 20, maxTrafficSpeed: 70 },
        { venue: "Little Park", location: "Kwun Tong, Kowloon", noOfEvents: 5, minTrafficSpeed: 15, maxTrafficSpeed: 30 },
        { venue: "Big Library", location: "Causeway Bay, Hong Kong Island", noOfEvents: 3, minTrafficSpeed: 20, maxTrafficSpeed: 40 },
        { venue: "ABC Mall", location: "Admiralty, Hong Kong Island", noOfEvents: 0, minTrafficSpeed: 30, maxTrafficSpeed: 80 },
        { venue: "ABC Centre", location: "Sham Shui Po, Kowloon", noOfEvents: 1, minTrafficSpeed: 25, maxTrafficSpeed: 80 },
    ]
    
    const [data, setdata] = useState(raw_data);
    const [sortByNo, setSortByNo] = useState(false);
    const [sortByMax, setSortByMax] = useState(false);
    const [sortByMin, setSortByMin] = useState(false);

    const handleChange = (event) => {
        setdata(
            raw_data.filter((key) => (key.venue.match(event.target.value) || key.location.match(event.target.value)))
        )
    };

    const handleClickNo = (event) => {
        setSortByNo(!sortByNo);
        if (sortByNo) {
            setdata(data.sort((a, b) => a.noOfEvents > b.noOfEvents ? 1 : -1))
        } else {
            setdata(data.sort((a, b) => a.noOfEvents < b.noOfEvents ? 1 : -1))
        }
    };

    const handleClickMin = (event) => {
        setSortByMin(!sortByMin);
        if (sortByMin) {
            setdata(data.sort((a, b) => a.minTrafficSpeed > b.minTrafficSpeed ? 1 : -1))
        } else {
            setdata(data.sort((a, b) => a.minTrafficSpeed < b.minTrafficSpeed ? 1 : -1))
        }
    };

    const handleClickMax = (event) => {
        setSortByMax(!sortByMax);
        if (sortByMax) {
            setdata(data.sort((a, b) => a.maxTrafficSpeed > b.maxTrafficSpeed ? 1 : -1))
        } else {
            setdata(data.sort((a, b) => a.maxTrafficSpeed < b.maxTrafficSpeed ? 1 : -1))
        }
    };

    return (
        <div>
            <UserPanel />
            <div className='userSearch'>
                <input
                    type="search"
                    className="searchBar"
                    placeholder="Search Venue here"
                    onChange={handleChange}>
                </input>
                <table className="searchResult">
                    <tr>
                        <th className="columnName" id="Venue">Venue</th>
                        <th className="columnName" id="Location">Location</th>
                        <th className="ColumnName" id="NoOfEvents"><a onClick={handleClickNo}>No of Events {sortByNo?'↑':'↓'}</a></th>
                        <th className="ColumnName" id="MinTrafficSpeed"><a onClick={handleClickMin}>Min Traffic Speed {sortByMin?'↑':'↓'}</a></th>
                        <th className="ColumnName" id="MaxTrafficSpeed"><a onClick={handleClickMax}>Max Traffic Speed {sortByMax?'↑':'↓'}</a></th>
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