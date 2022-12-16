import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CombineMap from "./CombineMap";

function MapSetup(){
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
    return (
        <>
        <MapContent locations={locations}/>
        </>
    )
}

function MapContent(props){
    return(
        <section id='userMap'>
            <div className='row'>
                    <div className='col'>
                        <CombineMap />
                    </div>
            </div>
            <div className='row'>
                    <div className='col'>
                        <h1>Map</h1>
                    </div>
                </div>

        </section>
    )
}

export default MapSetup;