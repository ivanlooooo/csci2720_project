// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//import '../css/admin/adminhome.css';  <-- later import!!!


function Locations(){
    let navigate = useNavigate();
    let [role, setRole] = useState(null)
    let [locations, setLocations] = useState(null)

    let crudLoc = param => navigate("crud?"+param);
    let reloadData = () => {
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
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

        setRole("admin");
    },[]) 

    return(
        <>
            { role === "error" && <Navigate to="/login" /> }
            { role === null && <LoadingContent /> }
            { role === "admin" && <AdminHome /> }
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

function AdminHome(props){
    return(
       <section id='adminHome' >
           <div className="banner">
               <div className="content">
                   <h1>Hello Admin! Welcome Back!</h1>
               </div>
           </div>
       </section>
    )
}

export default Locations;