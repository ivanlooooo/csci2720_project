import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";

import UserPanel from './UserPanel';
import '../CSS/User/UserSearch.css';
function UserSearch() {
    let navigate = useNavigate();
    let [locations, setLocations] = useState(null)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    let visitLoc = id => navigate("../location?id="+id);

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
          method:"POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ option: "readAll" })
          }).then(response=>response.json())
          .then(res => {
            res.error? console.log(res.error):setLocations(res.locList)
            locations = res.locList;
            console.log(res)
            return(res)
        })
        .then(res=>{
            //console.log(locations)
        }
            )
        .catch(err => console.log("error: "+err));
    },[]);
 
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + "/getallevent", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(res => {
                //console.log(res);
                locations.forEach(element => {
                    element.count = 0;
                })
                res.forEach(element => {
                    locations.forEach(element2 => {
                        if (element.venue[0] == element2.name) {
                            if (element2.count) {
                                element2.count ++;
                            } else {
                                element2.count = 1;
                            }
                        }
                    })
                });
                console.log(locations);
                setLocations(locations);
                forceUpdate();
            })
    }, []);

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
                        <th className="ColumnName" id="space1"></th>
                        <th className="ColumnName" id="space2"></th>
                    </tr>
                    {locations!==null &&  locations.map((key) => {
                        return (
                            <tr>
                                <td className="Cell" id="Name">{key.name}</td>
                                <td className="Cell" id="Lat">{key.longitude}</td>
                                <td className="Cell" id="Lon">{key.latitude}</td>
                                <td className="Cell" id="Loc ID">{key.locId}</td>
                                <td className="Cell" id="eventCount">{key.count}</td>
                                <td><button type="button" onClick={() => visitLoc(key.locId)}>Visit</button></td>
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