import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap";
import SeedChoroplethData from "../db/seed"
import ChoroplethMapHelper from "../lib/ChoroplethMapHelper"
import "../style/ChoroplethMap.css";
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
      search: SeedChoroplethData.search,
      population: SeedChoroplethData.population,
      crime: SeedChoroplethData.crime
    }
  }

  componentDidMount(){
    // this will create a map, taking two argument, data and color set
    GoogleMap.initChoroplethMap(this.state.search, ChoroplethMapStyle, this.state.searchColor)
    
    // when mount, call data for crime rate
    // this is a temporary setup for heat map. logic canbe reuse
    ChoroplethMapHelper.getAllCrime().then(res => {
       const templateObj = {}
       res.data.forEach(function(each){
         templateObj[each.community_name] = Number(each.SUM_count)
       })
       console.log(templateObj)
      this.setState({crime: templateObj})
    })
  }

  changeDataHandler(dataType, colorSet) {
    GoogleMap.initChoroplethMap(this.state[dataType], ChoroplethMapStyle, colorSet)
  }

  render() {
    return (
      <div className="container">
      <form>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="inlineRadio1" name="display" onClick={() => {this.changeDataHandler("search", this.state.searchColor)}} defaultChecked/>
          <label className="form-check-label" >Search History</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="inlineRadio2"  name="display" onClick={() => {this.changeDataHandler("population", this.state.populationColor)}}/>
          <label className="form-check-label" >Community Population</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="inlineRadio2"  name="display" onClick={() => {this.changeDataHandler("crime", this.state.crimeColor)}}/>
          <label className="form-check-label" >Crime Rate</label>
        </div>
      </form>

        <div id="choropleth-map"></div>
      </div>
    )
  }
}

export default ChoroplethMap;