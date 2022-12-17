import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../CSS/Admin/location.css';
import AdminPanel from './adminPanel';


function EventCRUD(){
    let navigate = useNavigate();
    let [role, setRole] = useState(null)
    let [events, setEvents] = useState(null)
    role = "admin";

    let crudEvent = param => navigate("crud?"+param);
    let reloadData = () => {

        fetch(process.env.REACT_APP_SERVER_URL+"/refresh_events",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ option: "readAll" })
            }).then(response=>response.json())
            .then(res => {
              console.log(res)
              return(res)
          })
          .then(res=>console.log(res))
            .catch(err => console.log("error: "+err));
        

       fetch(process.env.REACT_APP_SERVER_URL+"/getallevent",{
           method:"POST",
           credentials: "include",
           headers: { 'Content-Type': 'application/json' },
           //body: JSON.stringify({ option: "readAll" })
           }).then(response=>response.json())
           .then(res => {
             res.error? alert(res.error):setEvents(res)
             console.log(res)
             return(res)
         })
         .then(res=>console.log(res))
           .catch(err => console.log("error: "+err));

        //console.log(events);
        

    }

    useEffect(()=>{
       fetch(process.env.REACT_APP_SERVER_URL+"/getallevent",{
           method:"POST",
           credentials: "include",
           headers: { 'Content-Type': 'application/json' },
           //body: JSON.stringify({ option: "readAll" })
           }).then(response=>response.json())
           .then(res => {
             res.error? alert(res.error):setEvents(res)
             console.log(res)
             return(res)
         })
         .then(res=>console.log(res))
           .catch(err => console.log("error: "+err));
    },[]) 
    
    console.log(events);


    return(
        <>
        <AdminPanel />
            { role === "error" && <Navigate to="/login" /> }
            { role === null && <LoadingContent /> }
            { role === "admin" && <EventContent events={events} reloadData={reloadData} /> }
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

function EventContent(props){

   console.log("props:" + props.events);

    return(
        <section id='getallevent'>
            <div className='container-xl'>
                <div className='row'>
                    <div className='col'>
                        <h1>Event Table</h1>
                    </div>
                    <div className="col fnt-nav">
                        <button type="button" className="nav-btn fnt-btn" onClick={()=>{props.crudEve("option=create")}}>Create New Event</button>
                        <button className="nav-btn refresh-btn" onClick={props.reloadData}>Refresh</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <table className="location-table">
                            <thead>
                                <tr className="first-row">
                                    <th>Event ID</th>
                                    <th>Title</th>
                                    <th>Datetime</th>
                                    <th>Description</th>
                                    <th>Presenter</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.events!=null && props.events.map((ele,i) => 
                               //  {console.log(props.locations);
                                   
                                    <tr key={i}>
                                        <td>{ele.eventid}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.time}</td>
                                        <td>{ele.description}</td>
                                        <td>{ele.presenter}</td>
                                        <td>{ele.price}</td>
                                        <td>{ele.venue}</td>
                                        <td>
                                            <button type="button" className="button update-btn" onClick={() => props.crudEve("option=update&id="+ele)}>Update</button>
                                            <button type="button" className="button delete-btn" onClick={() => props.crudEve("option=delete&id="+ele)}>Delete</button>
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

export default EventCRUD;