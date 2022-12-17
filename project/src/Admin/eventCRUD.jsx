import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import AdminPanel from './adminPanel';

function EveCRUD() {
    let [role, setRole] = useState(null);
    let [event, setEvent] = useState(null);
    let [crudResult, setCrudResult] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    let [loc_titleErr,setloc_titleErr] = useState(null);
    let [loc_timeErr,setloc_timeErr] = useState(null);
    let [loc_descErr,setloc_descErr] = useState(null);
    let [loc_idErr,setloc_idErr] = useState(null); //new
    role = "admin"; // directly set as admin

    let EveId = searchParams.get("id");
    let submitForm = e => {
        e.preventDefault();
        let option= searchParams.get("option");
        let fetchBody = null;
        if(formValidation(e.target.title.value, e.target.time.value, e.target.latitude.value, e.target.presenter.value)) return;

        switch(option){
            case "create":

                    fetchBody = JSON.stringify({ 
                    option: option,
                    locationId : e.target.locId.value,
                    newName: e.target.name.value,
                    newLongitude: e.target.longitude.value,
                    newLatitude: e.target.latitude.value
                 });

                break;
            case "update":

                console.log("1");
                console.log(option);
            

                fetchBody = JSON.stringify({ 
                    option: option,
                    locationId : e.target.locId.value,
                    newName: e.target.name.value,
                    newLongitude: e.target.longitude.value,
                    newLatitude: e.target.latitude.value
                 });


            break;
            case "delete":

                console.log("2");
                console.log(option);


                fetchBody = JSON.stringify({ option: option, locationId: locId });


                alert('Location deleted Successfully!');
                break;
            default:
                return;
        }
        if (fetchBody === null) return;

        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: fetchBody
            }).then(response=>response.json())
            .then(res => {
              res.error? alert(res.error):setCrudResult(res.result)
              console.log(res)
              return(res)
          })
          .then(res=>console.log(res))
            .catch(err => console.log("error: "+err));
    }

    // Form validation funciton
    function formValidation(loc_name, loc_lat,loc_long, loc_id){ //new add loc_id
        let loc_nameErr = {};
        let loc_latErr = {};
        let loc_longErr = {};
        let loc_idErr = {};
        let isValid = false;
   
        if(!loc_name.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")){
            loc_nameErr = "false";
            isValid =true;
        }

        setloc_nameErr(loc_nameErr);
        setloc_latErr(loc_latErr);
        setloc_longErr(loc_longErr);
        setloc_idErr(loc_idErr); //new add
        return isValid;
    }

     useEffect(()=>{
        if(locId){
            console.log("locID:"+locId);
            
            fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
                method:"POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ option: "read" , locationId: locId })
                }).then(response=>response.json())
                .then(res => {
                  res.error? alert(res.error):setLocation(res)
                  console.log(res)
                  return(res)
              })
              .then(res=>console.log(res))
                .catch(err => console.log("error: "+err));
        }
    },[]) 
    
    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
     
            { role === "admin" && <CRUDContent loc_idErr={loc_idErr} loc_nameErr={loc_nameErr} loc_latErr={loc_latErr} loc_longErr={loc_longErr} location={location} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
            { role === null && <LoadingContent /> }
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


function CRUDContent(props){
    useEffect(()=>{
        let form = document.querySelector("form");

        if(props.location) form.querySelectorAll("input[type=text]").forEach(ele => ele.value=props.location[ele.name])
        if(props.option==="read" || props.option==="delete") form.querySelectorAll("input[type=text]").forEach(ele => ele.disabled=true)
        if(props.option==="update") form.querySelector("#locId").disabled = true
    }) 

    return(
        <section id='locationSetting'>
            {
                (props.crudResult === "fail" &&  props.option === "update" )&&
                <div className='row'>
                    <div className='col text-center bg-warning'>
                        <h3>Update Location Fail</h3>
                    </div>
                </div>
            }

            {
                (props.crudResult === "success" &&  props.option === "update" )&&
                <div className='row'>
                    <div className='col text-center bg-success'>
                        <h3>Update Location Success</h3>
                    </div>
                </div>
            }
            <div className='container'>
                <div className='row'>
                    <div className='col info-col setting-box'>
                        <h1>Location: {props.option}</h1>
                        <form className="setting-form" onSubmit={props.submitForm}>

                            <label className="title" htmlFor="locId">Location ID: </label><br/>
                            <input id="locId" type="text" step="1" name="locId" placeholder="Enter locId"></input><br/>
                            {
                                props.loc_idErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only positive or negative float!
                                </div>
                            }
                            
                            <label className="title" htmlFor="name">Location Name: </label><br/>
                            <input type="text" name="name" placeholder="Enter location name"></input><br/>
                            {
                                props.loc_nameErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only numbers and letters!
                                </div>
                            }


                            <label className="title" htmlFor="latitude">Latitude: </label><br/>
                            <input type="text" step="0.01" name="latitude" placeholder="Enter latitude"></input><br/>
                            {
                                props.loc_latErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only positive or negative float!
                                </div>
                            }

                            <label className="title" htmlFor="longitude">Longitude: </label><br/>
                            <input type="text" step="0.01" name="longitude" placeholder="Enter longitude"></input><br/>
                            {
                                props.loc_longErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only positive or negative float!
                                </div>
                            }

                            {props.option!=="read" && <input className="submit-btn" type="submit" value={props.option}/>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default EveCRUD;