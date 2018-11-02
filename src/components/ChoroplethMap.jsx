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
      crime: {},
      currentActiveTab: "search"
    }
  }

  componentDidMount(){

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
      this.setState({crime: tempCrime, search: tempSearch, population: tempPopulation}, () => {
        this.changeDataHandler("search", this.state.searchColor)
      })
    })

  }

  changeDataHandler(dataType, colorSet) {
    GoogleMap.initChoroplethMap(this.state[dataType], ChoroplethMapStyle, colorSet);

    document.getElementById(this.state.currentActiveTab).classList.remove('heatmap-tab-active');
    this.setState({ currentActiveTab: dataType }, () => {
      console.log(document.getElementById(this.state.currentActiveTab));
      document.getElementById(this.state.currentActiveTab).classList.add('heatmap-tab-active');
    });
  }

  render() {
    return (
      <div className="container heatmap">

        <div className="heatmap-tabs" >

          <button id="search" className="heatmap-tab heatmap-tab-active" onClick={() => {this.changeDataHandler("search", this.state.searchColor)}}>Search History</button>

          <button id="population" className="heatmap-tab" onClick={() => {this.changeDataHandler("population", this.state.populationColor)}}><span className="heatmap-tab-longname">Community&nbsp;</span>Population</button>

          <button id="crime" className="heatmap-tab" onClick={() => {this.changeDataHandler("crime", this.state.crimeColor)}}>Crime</button>

        </div>

        <div id="choropleth-map"></div>
      </div>
    )
  }
}

export default ChoroplethMap;
