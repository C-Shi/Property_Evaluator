import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../style/map.css';

export class MapContainer extends Component {

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    
  }
  
  render() {
    // const allLocations = this.props.locations.map(location => {
    //     return <Marker position={{lat: location.lat, lng: location.lng}} />
    //   }
    // )

    // const lot = [
    //   <Marker position={{lat: 51.0529778076597, lng: -114.10594520819}} />,
    //   <Marker position={{lat: 51.0420, lng: -114.0764}} />
    // ]
    
    return (
      <div className="landingPage-map">
        <Map
            google={this.props.google}
            initialCenter={{
              lat: 51.0486,
              lng: -114.0708
            }}
            zoom={13}
            onReady={this.fetchPlaces}
            onClick={this.onMapClicked}
          >

          <Marker position={{lat: 51.0529778076597, lng: -114.10594520819}} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>

              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAP)
})(MapContainer)