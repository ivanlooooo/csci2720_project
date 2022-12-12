import { useState, useEffect } from "react";

function CRUD(){
    let [role, setRole] = useState(null);

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
            method:"POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => setRole(res.role))
    },[])  

    return(
        <>
            {
                role !== "admin"? 
                <h3>Please Log in as Admin!</h3> :
                <section id='locationManage'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <h3>CRUD</h3>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>        
    ) 
}

export default CRUD;