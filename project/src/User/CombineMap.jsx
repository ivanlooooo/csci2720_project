import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function CombineMap(props) {  

  let navigate = useNavigate();
    const [mapApiLoaded, setMapApiLoaded] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapApi, setMapApi] = useState(null)

    let [locations, setLocations] = useState(null)  

    let detailLoc = param => navigate("../location?"+param); // added function

    const [myPosition, setMyPosition] = useState({
        lat: 25.04,
        lng: 121.50
      })
      useEffect(()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"/locationManage",{
          method:"POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ option: "readAll" })
          }).then(response=>response.json())
          .then(res => {
            setLocations(res.locList)
            return(res)
        })
        .then(res=>console.log(res))
          .catch(err => console.log("error: "+err));
        },[]) 
    const apiHasLoaded = (map, maps) => {
        setMapInstance(map)
        setMapApi(maps)
        setMapApiLoaded(true)
      };

      const MeseumMarker = ({ icon, text ,placeId}) => (
        <div>
          <img style={{ height: '30px', width: '30px' }} src={icon} onClick={() => detailLoc("id="+placeId)}/>
          <div>{text}</div>
        </div>
    )

    return (
        <section id="map">
            <div style={{ height: '100vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                    defaultCenter={props.center}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                >
                  {console.log('testing')}
               {locations!==null && locations.map(item=>(
                        <MeseumMarker
                            key={item.locId}
                            icon={require('../image/museum.png')}
                            lat={item.latitude}
                            lng={item.longitude}
                            text={item.text}
                            placeId={item.locId}
                        />
                ))}
                
                </GoogleMapReact>
            </div>
        </section>
    )
}
CombineMap.defaultProps = {
    center: {
      lat: 22.4185 ,
      lng: 114.2041
    },
    zoom: 17
  };

export default CombineMap;