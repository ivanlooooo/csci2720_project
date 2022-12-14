// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

//check by users

// import { useState, useEffect } from "react";
// import { Navigate, useSearchParams } from "react-router-dom";

// import '../CSS/Admin/userCRUD.css';

// function UserCRUD(){
//     let [role, setRole] = useState(null)
//     let [user, setUser] = useState(null)
//     let [crudResult, setCrudResult] = useState(null)
//     let [searchParams, setSearchParams] = useSearchParams()

//     let [user_wrongUsername, setuser_wrongUsername] = useState(null);
//     let [user_wrongPw, setuser_wrongPw] = useState(null);

//     let userId = searchParams.get("id");
//     let submitForm = e => {
//     e.preventDefault();

//     let fetchBody = null;
//     let option= searchParams.get("option");

//     // if(formValidation(e.target.name.value, e.target.password.value)) return;

//     switch(option){
//         case "create":
//             if(formValidation(e.target.name.value, e.target.password.value)) return;
//             fetchBody = JSON.stringify({ option: option, newCredential: {
//                 name: e.target.name.value,
//                 password: e.target.password.value
//             } })
//             alert('create success');
//             break;
//         case "update":
//             fetchBody = JSON.stringify({ option: option, userId: userId, newCredential: {
//                 name: e.target.name.value,
//                 password: e.target.password.value
//             } })
//             alert('update success');
//             break;
//         case "delete":
//             fetchBody = JSON.stringify({ option: option, userId: userId })
//             alert('delete success');
//             break;
//         }
//         if (fetchBody === null) return;

//         fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
//             method:"POST",
//             credentials: "include",
//             headers: { 'Content-Type': 'application/json' },
//             body: fetchBody
//         })
//         .then(res => res.json())
//         .then(res => setCrudResult(res.result))
//         .catch(err => console.log("error: "+err));
//     }


//     function formValidation(user_username, user_password){
//         let user_wrongUsername = {};
//         let user_wrongPw ={};
//         let isValid = false;

//         //username is 8-20 characters long, no _ or . at the beginning, in the middle or at the end
//         if(!user_username.match("^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")){
//             user_wrongUsername = "false";
//             isValid =true;
//         }

//         //minimum 8 characters, at least 1 letter and 1 number
//         if(!user_password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")){
//             user_wrongPw = "false";
//             isValid =true;
//         }

//         setuser_wrongUsername(user_wrongUsername);
//         setuser_wrongPw(user_wrongPw);
//         return isValid;
//     }

//     useEffect(()=>{
//         fetch(process.env.REACT_APP_SERVER_URL+"/checkRole",{
//             method:"POST",
//             credentials: "include"
//         })
//         .then(res => res.json())
//         .then(res => setRole(res.role))
//         .catch(err => console.log("error: "+err));

//         setRole("admin");

//         if(userId){
//             fetch(process.env.REACT_APP_SERVER_URL+"/userCredential",{
//                 method:"POST",
//                 credentials: "include",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ option: "read", userId: userId })
//             })
//             .then(res => res.json())
//             .then(res => setUser(res))
//             .catch(err => console.log("error: "+err));
//         }
//     },[]) 

//     return(
//         <>
//             { role === "error" && <Navigate to="/login" /> }
//             { role === "admin" && <CRUDContent user_wrongUsername={user_wrongUsername} user_wrongPw={user_wrongPw} user={user} option={searchParams.get("option")} submitForm={submitForm} crudResult={crudResult}/> }
//             { (role !== "admin" && role !== null) && <WrongRole />}    
//             { role === null && <LoadContent /> }
//         </>   
//     )
// }

// function LoadContent(){
//     let [dotNum, setDotNum] = useState(0)
//     useEffect(()=>{
//         let timer = setTimeout(()=>setDotNum((dotNum+1)%4),500)
//         return () => clearTimeout(timer)
//     }) 
//     return <h2>{"Loading" + ".".repeat(dotNum)}</h2>
// }

// function WrongRole(){
//     return <h3>Please log in as admin</h3>
// }

// function CRUDContent(props){
//     useEffect(()=>{
//         let form = document.querySelector("form");

//         if(props.user) form.querySelector("input[name=name]").value=props.user.name
//         if(props.option==="read" || props.option==="delete") form.querySelectorAll("input[type=text]").forEach(ele => ele.disabled=true)
//     }) 

//     return(
//         <section id='userSetting'>
//             {
//                 props.crudResult === "success" &&
//                 <div className='row'>
//                     <div className='col text-center bg-success'>
//                         <h3>Update Success</h3>
//                     </div>
//                 </div>
//             } 
            
//             {
//                 props.crudResult === "fail" && 
//                 <div className='row'>
//                     <div className='col text-center bg-warning'>
//                         <h3>Update Fail</h3>
//                     </div>
//                 </div>
//             }

                          
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col user-col-info info-box'>
//                         <div className='banner'>
//                             <h1>User {props.option}</h1>
//                         </div>
                    
//                         <form className="setting-form" onSubmit={props.submitForm}>
//                             <label className="title" htmlFor="role">User or Admin?</label><br/>
//                             <select className="dropbox" name="role">
//                             {/* <select className="dropbox" name="role" disabled> */}
//                                 <option value={"user"}>User</option>
//                                 <option value={"admin"}>Admin</option>
//                             </select><br/> 
                            
                            
//                             <label className="title" htmlFor="name">Username: </label><br/>
//                             <input type="text" name="name" placeholder="username"></input><br/>
//                             {
//                             props.user_wrongUsername === "false" && 
//                             <div className='alert alert-danger' role="alert">
//                                 Empty field is not allowed. Please enter numbers and letters.
//                             </div>
//                             }


//                             {(props.option!=="read" && props.option!=="delete") && 
//                             <>
//                                 <label className="title" htmlFor="password">Password: </label><br/>
//                                 <input type="password" name="password" placeholder="password"></input><br/>
//                                 {
//                                     props.user_wrongPw === "false" && 
//                                     <div className='alert alert-warning' role="alert">
//                                         Empty field is not allowed. Please enter a valid password.
//                                     </div>
//                                 }
//                             </>
//                             }
//                             {props.option!=="read" && <input className="submit-btn" type="submit" value={props.option}/>}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default UserCRUD;



import React, { useEffect, useState } from "react";
import { _getUserList, _delUser, _reg, _update } from "../util/req";
import AddModal from '../component/AddModal';
import Button from '../component/button';
import '../CSS/Admin/userCRUD.css';

export default function UserCRUD() {
  
  const TableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);


    const [showAddModal,setAddModal] = useState(false);
    const [showUpdateModal,setUpdateModal] = useState(false);
    const handleClickAdd = () => {
        setAddModal(true)
    }
    const handleCloseModal = () => {
        setAddModal(false)
        setUpdateModal(false);
        gelist();
    }
    const [list, setList] = useState([]);
    const [infoForm, setInfoForm] = useState({
        username: "",
        password: "",
    });

    const gelist = async () => {
        var res = await _getUserList();
        setList(res.data);
    };
    const del = async (id) => {
        await _delUser(id);
        gelist();
        alert("User Deleted!");
    };
    
    const update = async (it) => {
        setInfoForm({ ...it });
        setUpdateModal(true);
    };

    useEffect(() => {
        TableFilter.init();
        gelist();
    }, []);

    return (
        <div className="page-container">

            <div className="button-container">
                <div className="user-button">
                    <Button  onClick={handleClickAdd} englishLabel="Create User"/>
                </div>
            </div>

            <input type="search" class="table-filter" data-table="table" placeholder="search data in any field"/>


            <div className='row'>
                <div className='col'>
                    <table  className="table">
                        <thead>
                            <tr className="first-row" >
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {list.map((it, index) => (
                            <tr key={index}>
                            <td>{it.username}</td>
                            <td>{it.password}</td>
                            <td>
                                <div className="table-action-container">
                                <div className="user-button">
                                    <Button className="up-del-button" englishLabel="Update" onClick={() => update(it)}/>
                                </div>
                                <div className="user-button">
                                    <Button englishLabel="Delete" onClick={() => del(it._id)}/>
                                </div>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {showAddModal&&<AddModal className="admin-modal" onClickClose={handleCloseModal}></AddModal>}
                    {showUpdateModal&&<AddModal up infoForm={infoForm} className="admin-modal" onClickClose={handleCloseModal}></AddModal>}
                </div>
            </div>
        </div>
    );
}