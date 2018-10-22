import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap";
import "../style/ChoroplethMap.css";

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
        none: "#edf8fb",
        few: "#ccece6",
        some: "#99d8c9",
        average: "#66c2a4",
        many: "#2ca25f",
        most: "#006d2c"
      }
    }
  }

  componentDidMount(){
    // this will create a map, taking two argument, data and color set
    GoogleMap.initChoroplethMap(this.state.community, this.state.color)
  }

  render() {
    return (
      <div id="choropleth-map"></div>
    )
  }
}

export default ChoroplethMap;