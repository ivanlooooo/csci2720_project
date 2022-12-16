import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import UserPanel from './UserPanel';
import '../CSS/User/UserSearch.css';

function UserSearch() {
    let navigate = useNavigate();
    let [locations, setLocations] = useState(null)

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
          method:"POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ option: "readAll" })
          }).then(response=>response.json())
          .then(res => {
            res.error? alert(res.error):setLocations(res.locList)
            return(res)
        })
        .then(res=>{
            console.log(locations)}
            )
        .catch(err => console.log("error: "+err));
    },[]) 

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    if (searchInput.length > 0) {
        locations = locations.filter((key) => {
            return (key.name.match(searchInput));
        });
    }

    return (
        <div>
            <UserPanel />
            <div className='userSearch'>
                <input
                    type="search"
                    className="searchBar"
                    placeholder="Search Location here"
                    onChange={handleChange}
                    value={searchInput}>
                </input>
                <table className="searchResult">
                    <tr>
                        <th className="columnName" id="Name">Name</th>
                        <th className="columnName" id="Lat">Latitude</th>
                        <th className="ColumnName" id="Lon">Longitude</th>
                        <th className="ColumnName" id="LocID">Loc ID</th>
                        <th className="ColumnName" id="eventCount">Number of event</th>
                    </tr>
                    {locations!==null &&  locations.map((key) => {
                        return (
                            <tr>
                                <td className="Cell" id="Name">{key.name}</td>
                                <td className="Cell" id="Lat">{key.longitude}</td>
                                <td className="Cell" id="Lon">{key.latitude}</td>
                                <td className="Cell" id="Loc ID">{key.locId}</td>
                                <td className="Cell" id="eventCount">Later add back</td>
                                <td><button type="button">Visit</button></td>
                                <td><button type="button">Add Fav</button></td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}

export default UserSearch;