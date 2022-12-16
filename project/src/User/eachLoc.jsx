import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import BasicMap from "./Map"

function SingleLocation(){
    let [location, setLocation] = useState(null)
    let [comment, setComment] = useState(null)
    let [event, setEvent]=useState(null)
    let [searchParams, setSearchParams] = useSearchParams()

    let submitComment = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL+"/userComments",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "create"/*usrId: */, locationId: searchParams.get("id"),newComments: e.target.comment.value })
        })

    }

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "read", locationId: searchParams.get("id") })
        })
        .then(res => res.json())
        .then(res => res.error? alert(res.error):setLocation(res))
        .catch(err => console.log("error: "+err));

        fetch(process.env.REACT_APP_SERVER_URL+"/userComments",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "read", locationId: searchParams.get("id") })
        })
        .then(res => res.json())
        .then(res => setComment(res))
        .catch(err => console.log("error: "+err));
        /*
        fetch(process.env.REACT_APP_SERVER_URL+"/event",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "get", locationId: searchParams.get("id") })
        })
        .then(res => res.json())
        .then(res => setComment(res))
        .catch(err => console.log("error: "+err));
        */
    },[]) 

    return(
        <>
        <Content location={location} comment={comment} event={event} submitComment={submitComment}/>
        </>
    )
}

function Content(props){
    <section id='SingleLoc'>
        <div className='row'>
                <div className='col'>
                    <h1>Location: {props.location!=null && props.location.name}</h1>
                </div>
        </div>
        <div className='row'>
            <div className='col'>
                {props.location && <BasicMap position={{name: props.location.name, lat: props.location.latitude, lng:props.location.longitude}} />}
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <h3>Location Detail</h3>
                <table className="location-table">
                    <thead>
                    <tr className="first-row">
                            <th>Name</th>
                            <th>Loc Id</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        <tbody>
                        {props.location!=null &&
                                    <tr>
                                        <td>{props.location.name}</td>
                                        <td>{props.location.latitude}</td>
                                        <td>{props.location.longitude}</td>
                                        <td>{props.location.locId}</td>
                                    </tr>
                                } 
                        </tbody>
                    </thead>
                </table>
            </div>
            <div className='col'>
                <h3>Event Detail</h3>
                <table className="location-table">
                    <thead>
                        <tr className="first-row">
                            <th>Title</th>
                            <th>Time</th>
                            <th>Description</th>
                            <th>Presenter</th>
                            <th>Price</th>
                        </tr>
                        <tbody>
                        {props.location!=null &&
                                    <tr>
                                        <th>{props.comment.title}</th>
                                        <th>{props.comment.time}</th>
                                        <th>{props.comment.description}</th>
                                        <th>{props.comment.presenter}</th>
                                        <th>{props.comment.price}</th>
                                    </tr>
                                } 
                        </tbody>
                    </thead>
                </table>
            </div>
        </div>
    </section>
}
export default  SingleLocation;