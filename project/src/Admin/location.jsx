/*

*/

/**
 * Things to work on:
 * - styling
 * - responsiveness
 * - effect for wrong login role
 * - effect for loading
 * 
 * /checkRole: 
 * - method: POST
 * - request： usrId (signedCookie)
 * - return: role ("admin"/ "user"/ "error")
 * 
 * /locationManage:
 * - method: POST
 * - request： locationId, option(reload, create, read, readAll,, readFav update, delete), newLocation
 * - return: readAll, readFav - [location infos {id, name, latitude, longitude}], read - location infos {id, name, latitude, longitude}, other -result (success/ fail)
 * 
 */

 import { useNavigate, Navigate } from "react-router-dom";
 import { useState, useEffect } from "react";
 //import '../css/admin/location.css';
 

 function Locations(){
     let navigate = useNavigate();
     let [role, setRole] = useState(null)
     let [locations, setLocations] = useState(null)
     role = "admin";
 
     let crudLoc = param => navigate("crud?"+param);
     let reloadData = () => {
        let locationId = null;
        let option = '"readAll';
        let locationName = null;
        let longitude = null;
        let latitude = null;
         fetch("http://localhost:8080/locationManage",{
             //mode: 'cors',
             method:"POST",
             credentials: "same-origin",
             headers: { 'Content-Type': 'application/json'
             //'Access-Control-Allow-Origin': 'http://localhost:3000',
             //'Access-Control-Allow-Credentials': 'true' 
            },
             body: { locationId, option: "readAll", locationName, longitude,latitude }
         })
         .then(res => res.json())
         .then(res => setLocations(res))
         .catch(err => console.log("error: "+err));
     }
 
     console.log(locations);
     console.log(process.env.REA5CT_APP_SERVER_URL+"/locationManage");

     //useEffect(()=>{
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

        let locationId = null;
        let option = '"readAll';
        let locationName = null;
        let longitude = null;
        let latitude = null;

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
     //},[]) 
     
 
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
                                    
                                     <tr key={i}>
                                         <td>{ele.locationName}</td>
                                         <td>{ele.latitude}</td>
                                         <td>{ele.longitude}</td>
                                         <td>
                                         <li>hihihii</li>
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
 
 export default Locations;