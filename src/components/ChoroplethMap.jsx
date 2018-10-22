import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap";
import "../style/ChoroplethMap.css";

class ChoroplethMap extends Component {
  componentDidMount(){
    GoogleMap.initChoroplethMap(11)
  }

  render() {
    return (
      <div id="choropleth-map"></div>
    )
  }
}

export default ChoroplethMap;