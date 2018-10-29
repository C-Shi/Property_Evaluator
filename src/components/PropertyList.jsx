import React, {Component} from 'react';
import Property from './Property';
import BarChart from './BarChart';
import LineChart from './LineChart';
import MapStyle from "../asset/GoogleMapStyle"
import "../style/Map.css"
import "../style/PropertyList.css"
import "../style/mainPage.css"


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
      console.log(this.props)
      this.props.pageChangeHandler("choropleth")
    })
    mapDiv.appendChild(toChoroplethButton);

    if (this.props.locations.length === 0) {
      window.$('.property-list button').addClass('hidden')
    } else {
      window.$('.property-list button').removeClass('hidden')
    }
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
      });

      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
      var loc = new this.googleMaps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
      // add info window for each place
      const infoWindow = new this.googleMaps.InfoWindow({
        content: ""
      });

      infoWindow.setContent(
        '<div style="line-height:1.00;overflow:hidden;white-space:nowrap;" class="infoWindow">' +
        'Community: ' + location.comm_name + '<br><br>' + 'Address' + ': ' +
        location.address + '</div>');

      // add click listener
      console.log(window.$(`[data-scroll='${location.address}']`))
      this.googleMaps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
        window.$(".property-list").animate({
            scrollTop: window.$(`[data-scroll='${location.address}']`).offset().top
        }, 400);
      })

    })
    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);

    if (this.props.locations.length === 0) {
      window.$('.property-list button').addClass('hidden')
    } else {
      window.$('.property-list button').removeClass('hidden')
    }
  }

  changeDisplayHandler(e){
    window.$('.property-list .display-option').toggleClass('hidden')
    if (e.target.textContent === "Display Chart"){
      e.target.textContent = "Show Details"
    } else {
      e.target.textContent = `Display Chart`
    }
  }

    render() {
      let property = this.props.locations.map(location => {
        return <Property location={location} deleteProperty={this.props.deleteProperty} key={location.address}/>
      }) || ""

      property = property.reverse();

      const barChart = (this.props.page === "propertyList") ?
      (<BarChart propertyValues={this.props.propertyValues}/>) :
      ("");

      const lineChart = (this.props.page === "propertyList") ?
      (<LineChart population={this.props.population}/>) :
      ("");

      return (
        <div className="main-page-container">
          <div className="main-page-map-placeholder">
          </div>
          <div className="main-page">
            <div className="property-list">
              <button onClick={this.changeDisplayHandler} className="hidden">Display Chart</button>
              <div className="display-option hidden">
                {barChart}
                {lineChart}
              </div>
              <div className="display-option">
                {property}
              </div>
            </div>
          </div>
          <div id="map" className="map-init"></div>
        </div>
      );
    }
}

export default PropertyList;
