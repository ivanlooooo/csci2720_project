// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//show the events


import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import '../CSS/Admin/events.css';

//only for admin
function AdminOnly(){
    return <h3>Admin only, please log in as admin.</h3>
}

function Events(){
    let navigate = useNavigate();
    let [role, setRole] = useState(null)
    let [locations, setLocations] = useState(null)

    let crudLoc = param => navigate("crud?"+param);
    let reloadData = () => {
        fetch(process.env.REACT_APP_SERVER_URL+"/eventManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "reload" })
        })
        .then(res => res.json())
        .then(res => setLocations(res))
        .catch(err => console.log("error: "+err));
    }

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
            method:"POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => setRole(res.role))
        .catch(err => console.log("error: "+err));
        
        fetch(process.env.REACT_APP_SERVER_URL+"/eventManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "readAll" })
        })
        .then(res => res.json())
        .then(res => setLocations(res))
        .catch(err => console.log("error: "+err));

        setRole("admin");
    },[]) 

    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
            { role === null && <LoadingContent /> }
            { role === "admin" && <LocationsContent locations={locations} reloadData={reloadData} crudLoc={crudLoc} /> }
            { (role !== "admin" && role !== null) && <AdminOnly />}    
        </>   
    )
}

function LoadingContent(){
    let [dotNum, setDotNum] = useState(0)
    useEffect(()=>{
        let timer = setTimeout(()=>setDotNum((dotNum+1)%4),1000)
        return () => clearTimeout(timer)
    }) 
    return <h1>{".".repeat(dotNum)}</h1>
}


function LocationsContent(props){

    return(
        <section id='eventManage'>
            <div className='container-xl'>
                <div className='row'>
                    <div className='col'>
                        <h1>Event List</h1>
                    </div>
                    <div className="col fnt-nav">
                        <button type="button" className="nav-btn fnt-btn" onClick={() => props.crudLoc("option=create")}>Create New Event</button>
                        <button className="nav-btn refresh-btn" onClick={props.reloadData}>Refresh</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <table className="event-table">
                            <thead>
                                <tr className="first-row">
                                    <th>Place</th>
                                    <th>Event</th>
                                    <th>Road</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.locations!=null && props.locations.map((ele,i) => 
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{ele.event}</td>
                                        <td>{ele.road}</td>
                                        <td>
                                            <button type="button" className="button" onClick={() => props.crudLoc("option=read&id="+ele._id)}>Read</button>
                                            <button type="button" className="button update-btn" onClick={() => props.crudLoc("option=update&id="+ele._id)}>Update</button>
                                            <button type="button" className="button delete-btn" onClick={() => props.crudLoc("option=delete&id="+ele._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Events;