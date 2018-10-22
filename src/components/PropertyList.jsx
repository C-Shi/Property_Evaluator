import React, {Component} from 'react';
import Property from './Property';
import MapStyle from "../asset/GoogleMapStyle"
import "../style/Map.css"
import "../style/PropertyList.css"


class PropertyList extends Component {

  componentDidMount() {
    this.googleMaps = window.google.maps;
    const location = { lat: 51.044270 , lng: -114.062019};

    this.map = new this.googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
      },
       styles: MapStyle
    });

    // create a button on the google map, and add event listener to go to choropleth map
    const mapDiv =  document.getElementById('map');
    const toChoroplethButton = document.createElement("button")
    toChoroplethButton.setAttribute("class", "to-choropleth")
    toChoroplethButton.textContent = "Community Statistics"
    toChoroplethButton.addEventListener("click", () => {
      this.props.pageChangeHandler("choropleth")
    })
    mapDiv.appendChild(toChoroplethButton);
}

  componentDidUpdate(){
    // adding marker to the map and auto adjust zoom
    const bounds  = new this.googleMaps.LatLngBounds(
      new this.googleMaps.LatLng(51.014270, -114.062019),
      new this.googleMaps.LatLng(51.054270, -114.062019),
    );
    this.props.locations.forEach(location => {
      var myLatlng = new this.googleMaps.LatLng(location.lat, location.lng);
      var marker = new this.googleMaps.Marker({
        position: myLatlng,
        icon: "http://maps.google.com/mapfiles/kml/pal3/icon56.png"
      });
      
      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
      var loc = new this.googleMaps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
    })
    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);
  }

    render() {
      const property = this.props.locations.reverse().map(location => {
        return <Property location={location} deleteProperty={this.props.deleteProperty} key={location.address}/>
      }) || ""

      return (
        <div>
          <div className="main-page">
            <div className="property-list">{property}</div>
          </div>
          <div id="map" className="map-init"></div>
        </div>
      );
    }
}

export default PropertyList;
