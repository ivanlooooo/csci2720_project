// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//if is not admin login, then return CRUD

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
                <h2>Please Log in as Admin!</h2>:
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