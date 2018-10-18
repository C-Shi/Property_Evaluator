import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../style/map.css';

export class MapContainer extends Component {

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);

  }

  render() {
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

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

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
  apiKey: (process.env.GOOGLE_MAP_API_KEY)
})(MapContainer)