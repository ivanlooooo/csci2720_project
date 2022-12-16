import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import SimpleMap from './GoogleMap'

function Map(){
    let navigate = useNavigate();
    let [locations, setLocations] = useState(null)
    let [addFavResult, setAddFavResult] = useState(null)
    console.log("testing")

    useEffect(()=>{
        console.log("testing")
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "readAll" })
        })
        .then(res => res.json())
        .then(res => {
            res.error? alert(res.error):setLocations(res)
            console.log(res)
        })
        .then(res=>console.log(res))
        .catch(err => console.log("error: "+err));
    },[]) 

    return(
        <>
            { <MapContent locations={locations}/> }
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
    return <h3>Please log in as user</h3>
}

function MapContent(props){
    return(
        <section id='userMap'>
            <div className='container-fluid'>

                <div className='row'>
                    <div className='col'>
                        <h1>Map</h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <SimpleMap />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <table className="location-table">
                            <thead>
                                <tr className="first-row">
                                    <th>Name</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>link</th>
                                    <th>Favourite</th>
                                    <th>MAP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.locations!=null && props.locations.map((ele,i) => 
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{ele.latitude}</td>
                                        <td>{ele.longitude}</td>
                                        <td><button type="button" onClick={() => props.visitLoc(ele._id)}>Visit</button></td>
                                        <td><button type="button" onClick={() => props.addFav(ele._id)}>Add</button></td>
                                        <td><button type="button"><FontAwesomeIcon className='fa' icon={faMapLocation} onClick={()=> console.log("Pin Local")}/></button></td>
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

export default Map;