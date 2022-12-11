import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SimpleMap() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

function GoogleMap() {
    return (
        <section id="map">
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <h1>Google Map</h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <p>this is the location for google map, uncomment code when you have enabled api key, then insert the api key into .env file</p>
                        {/* <SimpleMap /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GoogleMap;