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
    let locId = Number(searchParams.get("id"))

    useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "read", locationId: locId})
        })
        .then(response=>response.json())
          .then(res => {
            setLocation(res)
            return(res)
        })
        .catch(err => console.log("error: "+err));


        fetch(process.env.REACT_APP_SERVER_URL+"/userComments",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option: "read", locationId: searchParams.get("id") })
        })
        .then(res => res.json())
        .then(res => {res.length>0? setComment(res): console.log(res.error)
        console.log(res)})
        .catch(err => console.log("error: "+err));

        fetch(process.env.REACT_APP_SERVER_URL+"/findeventByLoc",{
            method:"POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  locationId: searchParams.get("id") })
        })
        .then(res => res.json())
        .then(res => setEvent(res))
        .catch(err => console.log("error: "+err));
    },[]) 
    return(
    <section id='SingleLoc'>
        <div className='row'>
                <div className='col'>
                    <h1>Location: {location!=null && location.name} </h1>
                </div>
        </div>
        <div className='row'>
            <div className='col'>
                {console.log(location)}
                {location && <BasicMap position={{name: location.name, lat:location.latitude, lng:location.longitude}} />}
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
                        {location!=null &&
                                    <tr>
                                        <td>{location.name}</td>
                                        <td>{location.latitude}</td>
                                        <td>{location.longitude}</td>
                                        <td>{location.locId}</td>
                                    </tr>
                                } 
                    </thead>
                </table>
            </div>
            {/*
            <div className='col'>
                <h3>Event Detail</h3>
                <table className="event-table">
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
        */}

        <div className='row'>
            <div className='col'>
                <h3>Comments</h3>
                <table className="comment-table">
                    <thead>
                        <tr className="first-row">
                                    <th>Name</th>
                                    <th>Comment</th>
                        </tr>
                                {comment!=null && comment?.map((ele,i) => 
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{ele.comment}</td>
                                    </tr>
                                )}
                    </thead>
                </table>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <h3>Leave a comment </h3>
                <form className="comment-form" onSubmit={submitComment}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" required></input><br />
                            <textarea row="5" name="comment" type="text" placeholder="Enter your comment"></textarea>
                            <input type="submit" value="submit"/><br/><br/>
                </form>
            </div>
        </div>
        </div>
    </section>
    )
}
export default  SingleLocation;