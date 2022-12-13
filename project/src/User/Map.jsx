import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function GoogleMap(props) {  

    const [mapApiLoaded, setMapApiLoaded] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapApi, setMapApi] = useState(null)

    const [myPosition, setMyPosition] = useState({
        lat: 25.04,
        lng: 121.50
      })

    let location=[
        {
            placeId : 3110031,
            lat: 22.501639,
            lng: 114.128911,
            text: 'North District Town Hall (Auditorium)'
        },
        {
            placeId : 36310035,
            lat: 22.38136,
            lng: 114.18990,
            text: 'Sha Tin Town Hall (Auditorium)'
        },
        {
            placeId : 75010017,
            lat: 22.285056,
            lng: 114.222075,
            text: 'Hong Kong Film Archive (Cinema)'
        },
    ]

    const apiHasLoaded = (map, maps) => {
        setMapInstance(map)
        setMapApi(maps)
        setMapApiLoaded(true)
      };
    
    const handleCenterChange = () => {
        if(mapApiLoaded) {
          setMyPosition({
            lat: mapInstance.center.lat(),
            lng: mapInstance.center.lng()
          })
        }
    }

    const MeseumMarker = ({ icon, text }) => (
        <div>
          <img style={{ height: '30px', width: '30px' }} src={icon} />
          <div>{text}</div>
        </div>
    )

    return (
        <section id="map">
            <input type="button" value="測試自動完成" onClick={handleAutocomplete} />
            <div style={{ height: '100vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                    onBoundsChange={handleCenterChange}
                    defaultCenter={props.center}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                >
                {location.map(item=>(
                        <MeseumMarker
                            icon={require('../image/museum.png')}
                            lat={item.lat}
                            lng={item.lng}
                            text={item.text}
                            placeId={item.placeId}
                        />
                ))}
                
                </GoogleMapReact>
            </div>
        </section>
    )
}
GoogleMap.defaultProps = {
    center: {
      lat: 22.4185 ,
      lng: 114.2041
    },
    zoom: 17
  };

export default GoogleMap;