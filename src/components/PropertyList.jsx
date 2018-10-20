import React, {Component} from 'react';
import Property from './Property';

class PropertyList extends Component {

  componentDidMount() {
    const googleMaps = window.google.maps;
    const location = { lat: 51.044270 , lng: -114.062019};

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
      }
    });
  }

    render() {
      // const property = this.props.locations.map(location => {
      //   return <NeighborInfo location={location}/>
      // })

      return (
        <div>
          <div className="main-page">
              {/* {property} */}
          </div>

          <div id="map" style={{"width": "505px", "height": "500px"}}></div>
        </div>
      );
    }
}

export default PropertyList;