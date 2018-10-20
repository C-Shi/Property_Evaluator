import React, {Component} from 'react';
import Property from './Property';

class PropertyList extends Component {

  componentDidMount() {
    this.googleMaps = window.google.maps;
    const location = { lat: 51.044270 , lng: -114.062019};

    this.map = new this.googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
      }
    });
    
    console.log(this.props.locations)
  }

  componentDidUpdate(){
    this.props.locations.forEach(location => {
      var myLatlng = new this.googleMaps.LatLng(location.lat, location.lng);
      var marker = new this.googleMaps.Marker({
        position: myLatlng,
        title:"Hello World!"
      });
      
      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
    })
  }

    render() {
      const property = this.props.locations.map(location => {
        return <Property location={location}/>
      }) || ""

      return (
        <div>
          <div className="main-page">
              {property}
          </div>
          <div id="map" style={{"width": "505px", "height": "500px"}}></div>
        </div>
      );
    }
}

export default PropertyList;