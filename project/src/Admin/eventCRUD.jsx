// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//check by users

import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

//import '../css/admin/locCrud.css';

//only for admin
function AdminOnly(){
    return <h3>Admin only, please log in as admin.</h3>
}


function EventCRUD(){
    let [role, setRole] = useState(null)
    let [location, setLocation] = useState(null)
    let [crudResult, setCrudResult] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams()
    let [loc_wrongName,setloc_wrongName] = useState(null);

    let locId = searchParams.get("id");
    let submitForm = e => {
        e.preventDefault();
        let fetchBody = null;
        let option= searchParams.get("option");

        if(formValidation(e.target.name.value)) return;

        switch(option){
            case "create":
                fetchBody = JSON.stringify({ option: option, newLocation: {
                    name: e.target.name.value,
                } })
                break;
            case "update":
                fetchBody = JSON.stringify({ option: option, locationId: locId, newLocation: {
                    name: e.target.name.value,
                } })
                alert('loc updated');
                break;
            case "delete":
                fetchBody = JSON.stringify({ option: option, locationId: locId })
                alert('loc deleted');
                break;
        }
        if (fetchBody === null) return;

        fetch(process.env.REACT_APP_SERVER_URL+"/locationList",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: fetchBody
        })
        .then(res => res.json())
        .then(res => res.error? alert(res.error):setCrudResult(res.result))
        .then(res => console.log(res))
        .catch(err => console.log("error: "+err));
    }

    
    function formValidation(loc_name, loc_lat,loc_long){
        let loc_wrongName = {};
        let isValid = false;
    
        if(!loc_name.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")){
            loc_wrongName = "false";
            isValid =true;
        }

        setloc_wrongName(loc_wrongName);
        return isValid;
    }

     useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/checkIsAdmin",{
            method:"POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => setRole(res.role))
        .catch(err => console.log("error: "+err));

        if(locId){
            fetch(process.env.REACT_APP_SERVER_URL+"/EventList",{
                method:"POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ option: "read", locationId: locId })
            })
            .then(res => res.json())
            .then(res => res.error? alert(res.error):setLocation(res))
            .catch(err => console.log("error: "+err));
        }
    },[]) 
    
    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
            { role === "admin" && <CRUDContent loc_wrongName={loc_wrongName} location={location} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
            { (role !== "admin" && role !== null) && <AdminOnly />}
            { role === null && <LoadContent /> }    
        </>   
    )
}


function LoadContent(){
    let [dotNum, setDotNum] = useState(0)
    useEffect(()=>{
        let timer = setTimeout(()=>setDotNum((dotNum+1)%4),500)
        return () => clearTimeout(timer)
    }) 
    return <h2>{"Loading" + ".".repeat(dotNum)}</h2>
}


//location contents
function CRUDContent(props){
    useEffect(()=>{
        let form = document.querySelector("form");

        if(props.location) form.querySelectorAll("input[type=text]").forEach(ele => ele.value=props.location[ele.name])
        if(props.option==="read" || props.option==="delete") form.querySelectorAll("input[type=text]").forEach(ele => ele.disabled=true)
    }) 

    return(
        <section id='locationSetting'>
            {
                props.crudResult === "success" &&
                <div className='row'>
                    <div className='col text-center bg-success'>
                        <h3>Update Success</h3>
                    </div>
                </div>
            }
            
            {
                props.crudResult === "fail" && 
                <div className='row'>
                    <div className='col text-center bg-danger'>
                        <h3>Update Fail</h3>
                    </div>
                </div>
            }


            
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Location: {props.option}</h1>
                        <form className="setting-form" onSubmit={props.submitForm}>
                            <label className="title" htmlFor="name">Location Name: </label><br/>
                            <input type="text" name="name" placeholder="Location Name"></input><br/>
                            {
                                props.loc_wrongName === "false" && 
                                <div className='alert alert-danger' role="alert">
                                    Empty field is not allowed. Please enter numbers and letters.
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

export default EventCRUD;