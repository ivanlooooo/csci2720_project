import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = (props) => {

  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={{lat: 22.302711, lng: 114.177216}}
        defaultZoom={10}
        // center={{lat: props.position.lat,lng: props.position.lng}}
        center={{lat: props.position.lat, lng: props.position.lng}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}

      >
        {/* Update the Pin_location */}
        <AnyReactComponent
            lat={props.position.lat}
            lng={props.position.lng}
            text={props.position.name}
          />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
