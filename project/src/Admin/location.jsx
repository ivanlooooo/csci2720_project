/*

*/

import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../CSS/Admin/location.css';


function Locations(){
    let navigate = useNavigate();
    let [role, setRole] = useState(null)
    let [locations, setLocations] = useState(null)
    role = "admin";

    let crudLoc = param => navigate("crud?"+param);
    let reloadData = () => {
      /*  let locationId = null;
       let option = '"readAll';
       let locationName = null;
       let longitude = null;
       let latitude = null; */

       fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
           method:"POST",
           credentials: "include",
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ option: "readAll" })
           }).then(response=>response.json())
           .then(res => {
             res.error? alert(res.error):setLocations(res.locList)
             console.log(res)
             return(res)
         })
         .then(res=>console.log(res))
           .catch(err => console.log("error: "+err));



       // fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
       //     //mode: 'cors',
       //      method:"POST",
       //      credentials: "include",
       //      headers: { 'Content-Type': 'application/json'
       //      //'Access-Control-Allow-Origin': 'http://localhost:3000',
       //      //'Access-Control-Allow-Credentials': 'true' 
       //     },
       //      //body: { locationId, option: "readAll", locationName, longitude,latitude }
       //      body: JSON.stringify({ option: "readAll" })
       //  })
       //  .then(res => res.json())
       //  .then(res => setLocations(res))
       //  .catch(err => console.log("error: "+err));
        console.log("location-check1:"+locations);
        

    }


    useEffect(()=>{
       // redundoncy 
       /*
       fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
           method:"POST",
           credentials: "include"
       })
       .then(res => res.json())
       .then(res => setRole(res.role))
       .catch(err => console.log("error: "+err));
       */

/*         let locationId = null;
       let option = '"readAll';
       let locationName = null;
       let longitude = null;
       let latitude = null; */
       fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
           method:"POST",
           credentials: "include",
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ option: "readAll" })
           }).then(response=>response.json())
           .then(res => {
             res.error? alert(res.error):setLocations(res.locList)
             console.log(res)
             return(res)
         })
         .then(res=>console.log(res))
           .catch(err => console.log("error: "+err));
    },[]) 
    
    console.log("location-check2:"+locations);

    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
            { role === null && <LoadingContent /> }
            { role === "admin" && <LocationsContent locations={locations} reloadData={reloadData} crudLoc={crudLoc} /> }
            { (role !== "admin" && role !== null) && <WrongRole />}    
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

function WrongRole(){
    return <h3>Please log in as admin</h3>
}

function LocationsContent(props){

   console.log("props:" + props.locations);

    return(
        <section id='locationManage'>
            <div className='container-xl'>
                <div className='row'>
                    <div className='col'>
                        <h1>Location Table</h1>
                    </div>
                    <div className="col fnt-nav">
                        <button type="button" className="nav-btn fnt-btn" onClick={() => props.crudLoc("option=create")}>Create New Location</button>
                        <button className="nav-btn refresh-btn" onClick={props.reloadData}>Refresh</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <table className="location-table">
                            <thead>
                                <tr className="first-row">
                                    <th>name</th>
                                    <th>latitude</th>
                                    <th>longitude</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.locations!=null && props.locations.map((ele,i) => 
                               //  {console.log(props.locations);
                                   
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{ele.latitude}</td>
                                        <td>{ele.longitude}</td>
                                        <td>
                                            <button type="button" className="button" onClick={() => props.crudLoc("option=read&id="+ele.locId)}>Read</button>
                                            <button type="button" className="button update-btn" onClick={() => props.crudLoc("option=update&id="+ele.locId)}>Update</button>
                                            <button type="button" className="button delete-btn" onClick={() => props.crudLoc("option=delete&id="+ele.locId)}>Delete</button>
                                        </td>
                                    </tr>
                               //  }  
                                )} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Locations;