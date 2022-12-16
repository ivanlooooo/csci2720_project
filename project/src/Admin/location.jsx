import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import AdminPanel from './adminPanel';

function LocCURD() {
    let [role, setRole] = useState(null)
    let [location, setLocation] = useState(null)
    let [crudResult, setCrudResult] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams()
    let [loc_nameErr,setloc_nameErr] = useState(null);
    let [loc_latErr,setloc_latErr] = useState(null);
    let [loc_longErr,setloc_longErr] = useState(null);

    let locId = searchParams.get("id");
    let submitForm = e => {
        e.preventDefault();
        let fetchBody = null;
        let newLocation = null; //added
        let option= searchParams.get("option");

        if(formValidation(e.target.name.value, e.target.latitude.value, e.target.longitude.value)) return;

        switch(option){
            case "create":
                alert('Location created Successfully!');
                newLocation = e.target.name.value; //added
                break;
            case "update":
                alert('Location updated Successfully!');
                newLocation = e.target.name.value; //added
                break;
            case "delete":
                alert('Location deleted Successfully!');
                break;
            default:
                return;
        }
        //if (fetchBody === null) return;

        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
            method:"POST",
            credentials: "include", //same-origin??
            headers: { 'Content-Type': 'application/json' },
            body: { locId, option, newLocation }
        })
        .then(res => res.json())
        .then(res => res.error? alert(res.error):setCrudResult(res.result))
        .then(res => console.log(res))
        .catch(err => console.log("error: "+err));
    }
    // Form validation funciton
    function formValidation(loc_name, loc_lat,loc_long, ){ //new add loc_id
        let loc_nameErr = {};
        let loc_latErr = {};
        let loc_longErr = {};
//        let loc_idErr = {}; //new add
        let isValid = false;
   
        if(!loc_name.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")){
            loc_nameErr = "false";
            isValid =true;
        }

        if(!loc_lat.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")){
            loc_latErr = "false";
            isValid =true;
        }

        if(!loc_long.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")){
            loc_longErr = "false";
            isValid =true;
        }
    
        //new add
 /*       if(!loc_id.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")){
            loc_idErr = "false";
            isValid =true;
        }
*/
        setloc_nameErr(loc_nameErr);
        setloc_latErr(loc_latErr);
        setloc_longErr(loc_longErr);
      //  setloc_idErr(loc_idErr); //new add
        return isValid;
    }

     useEffect(()=>{
        //redundancy
        /*
        fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
            method:"POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => setRole(res.role))
        .catch(err => console.log("error: "+err));
        */
       
        role = "admin";

        if(locId){
            let option = "read"; //added
            let newLocation  = null; //added
            fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
                method:"POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                //body: JSON.stringify({ option: "read", locationId: locId })
                body: { locId, option, newLocation}
            })
            .then(res => res.json())
            .then(res => res.error? alert(res.error):setLocation(res))
            .catch(err => console.log("error: "+err));
        }
    },[]) 
    
    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
     
            { role === "admin" && <CRUDContent loc_nameErr={loc_nameErr} loc_latErr={loc_latErr} loc_longErr={loc_longErr} location={location} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
            { role === null && <CRUDContent loc_nameErr={loc_nameErr} loc_latErr={loc_latErr} loc_longErr={loc_longErr} location={location} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
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
    }) 

    return(
        <section id='locationSetting'>
            {
                props.crudResult === "fail" && 
                <div className='row'>
                    <div className='col text-center bg-warning'>
                        <h3>Update Location Fail</h3>
                    </div>
                </div>
            }

            {
                props.crudResult === "success" &&
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
                            <label className="title" htmlFor="name">Location Name: </label><br/>
                            <input type="text" name="name" placeholder="Enter location name"></input><br/>
                            {
                                props.loc_nameErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only numbers and letters!
                                </div>
                            }

                            {/* {
                                Object.keys(props.loc_nameErr).map((key)=>{
                                    <div className='alert alert-danger' role="alert">
                                        {props.loc_nameErr[key]}
                                    </div>
                                })
                            } */}

                            <label className="title" htmlFor="latitude">Latitude: </label><br/>
                            <input type="text" name="latitude" placeholder="Enter latitude"></input><br/>
                            {
                                props.loc_latErr === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    The field can't be empty. Only positive or negative float!
                                </div>
                            }

                            <label className="title" htmlFor="longitude">Longitude: </label><br/>
                            <input type="text" name="longitude" placeholder="Enter longitude"></input><br/>
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
export default LocCURD;