import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap";
import ChoroplethMapHelper from "../lib/ChoroplethMapHelper"
import "../style/ChoroplethMap.css";
import "../style/heatmapTabs.css";
import ChoroplethMapStyle from "../asset/ChoroplethMapStyle.js"

class ChoroplethMap extends Component {
  constructor(){
    super()
    this.state = {
      searchColor: {
        none: "#fef0d9",
        few: "#fdd49e",
        some: "#fdbb84",
        average: "#fc8d59",
        many: "#e34a33",
        most: "#b30000"
      },
      populationColor: {
        none: "#eff3ff",
        few: "#c6dbef",
        some: "#9ecae1",
        average: "#6baed6",
        many: "#3182bd",
        most: "#08519c",
      },
      crimeColor: {
        none: "#f2f0f7",
        few: "#dadaeb",
        some: "#bcbddc",
        average: "#9e9ac8",
        many: "#756bb1",
        most: "#54278f"
      },
      // this is a temporary setup for heat map
      search: {},
      population: {},
      crime: {}
    }
  }

  componentDidMount(){
    // this will create a map, taking two argument, data and color set
    GoogleMap.initChoroplethMap(this.state.search, ChoroplethMapStyle, this.state.searchColor)

    ChoroplethMapHelper.fetchData()
    .then(res => {
      let tempSearch = {};
      let tempPopulation = {};
      let tempCrime = {};
      res.data.forEach(function(community){
        tempPopulation[community.name] = community.population;
        tempCrime[community.name] = community.crime;
        tempSearch[community.name] = community.search
      })
      this.setState({crime: tempCrime, search: tempSearch, population: tempPopulation})
    })
  }

  changeDataHandler(dataType, colorSet) {
    GoogleMap.initChoroplethMap(this.state[dataType], ChoroplethMapStyle, colorSet)
  }

  render() {
    return (
      <div className="container heatmap">

        <form className="map-radio heatmap-radio">
          <div className="form-check form-check-inline" onClick={() => {this.changeDataHandler("search", this.state.searchColor)}}>
            <label className="form-check-label" for="inlineRadio1" >Search History</label>
            <input className="form-check-input" type="radio" id="inlineRadio1" name="heatmap" onClick={() => {this.changeDataHandler("search", this.state.searchColor)}} defaultChecked/>
          </div>
          <div className="form-check form-check-inline" onClick={() => {this.changeDataHandler("population", this.state.populationColor)}}>
            <label className="form-check-label" for="inlineRadio2" >Community Population</label>
            <input className="form-check-input" type="radio" id="inlineRadio2"  name="heatmap" onClick={() => {this.changeDataHandler("population", this.state.populationColor)}}/>
          </div>
          <div className="form-check form-check-inline" onClick={() => {this.changeDataHandler("crime", this.state.crimeColor)}}>
            <label className="form-check-label" for="inlineRadio3" >Crime Rate</label>
            <input className="form-check-input" type="radio" id="inlineRadio3"  name="heatmap" onClick={() => {this.changeDataHandler("crime", this.state.crimeColor)}}/>
          </div>
        </form>

        <div id="choropleth-map"></div>
      </div>
    )
  }
}

export default ChoroplethMap;
