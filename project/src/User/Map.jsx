import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function BasicMap(props) {  

    const [mapApiLoaded, setMapApiLoaded] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapApi, setMapApi] = useState(null)

    const apiHasLoaded = (map, maps) => {
        setMapInstance(map)
        setMapApi(maps)
        setMapApiLoaded(true)
      };
    const MeseumMarker = ({ icon, text }) => (
        <div>
          <img style={{ height: '30px', width: '30px' }} src={icon} />
          <div>{text}</div>
        </div>
    )

    return (
        <section id="map">
            <div style={{ height: '100vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                    defaultCenter={{lat: 22.302711, lng: 114.177216}}
                    defaultZoom={12}
                    center={{lat: props.position.lat, lng: props.position.lng}}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                > 
                        {props!==null &&
                                    <MeseumMarker
                                    icon={require('../image/museum.png')}
                                    lat={props.position.lat}
                                    lng={props.position.lng}
                                    text={props.position.text}
                                    placeId={props.position.locId}
                                    />
                            }
                </GoogleMapReact>
            </div>
        </section>
    )
}

export default BasicMap;