import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap";
import "../style/ChoroplethMap.css";
import ChoroplethMapStyle from "../asset/ChoroplethMapStyle.js"

class ChoroplethMap extends Component {
  constructor(){
    super()
    this.state = {
      community: {
        "DOWNTOWN COMMERCIAL CORE": 1,
        "SAGE HILL": 3, 
        "CLIFF BUNGALOW": 5, 
        "CAPITOL HILL": 7, 
        "ACADIA": 9,
        "MACEWAN GLEN": 10,
        "HAMPTONS": 11, 
        "RUNDLE": 12, 
        "COUGAR RIDGE": 20, 
        "HIGHWOOD": 40, 
        "FOREST LAWN": 50, 
        "BRIDGELAND/RIVERSIDE": 80,
        "WOODLANDS": 100,
        "MAYLAND": 160,
        "FOOTHILLS": 200, 
        "TUSCANY": 13,
        "ROYAL OAK": 9
      },
      color: {
        none: "#fef0d9",
        few: "#fdd49e",
        some: "#fdbb84",
        average: "#fc8d59",
        many: "#e34a33",
        most: "#b30000"
      }
    }
  }

  componentDidMount(){
    // this will create a map, taking two argument, data and color set
    GoogleMap.initChoroplethMap(this.state.community, ChoroplethMapStyle, this.state.color)
  }

  render() {
    return (
      <div id="choropleth-map"></div>
    )
  }
}

export default ChoroplethMap;