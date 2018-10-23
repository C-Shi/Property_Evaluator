// import React
import React, { Component } from 'react';
// import Component
import Navbar from './components/Navbar.jsx';
import PropertyList from './components/PropertyList.jsx';
import SearchBox from './components/SearchBox.jsx'
import ChoroplethMap from "./components/ChoroplethMap";
// import styles
import "./style/index.css"
// import helper
import LocationBuilder from "./lib/LocationBuilder";
import AddressHelper from "./lib/AddressHelper";
import mapAnimator from "./lib/mapAnimationHelper"
import LocationFinder from './lib/LocationFinder.js';

class App extends Component {
  constructor(){
    super()
    this.state = {
      address: '',
      locations: [],
      propertyValues:{
        labels: ['2014', '2015', '2016', '2017', '2018'],
        datasets:[]
        // labels: ["Chocolate", "Vanilla", "Strawberry"],
        // datasets: [
        //     {
        //         label: "Harpo",
        //         fillColor: "blue",
        //         data: [3,7,4]
        //     },
        //     {
        //         label: "Chico",
        //         fillColor: "red",
        //         data: [4,3,5]
        //     },
        //     {
        //         label: "Groucho",
        //         fillColor: "green",
        //         data: [7,2,6]
        //     }
        // ]
      },
      page: "searchBox"
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.addProperty = this.addProperty.bind(this)
    this.pageChangeHandler = this.pageChangeHandler.bind(this)
    this.deleteProperty = this.deleteProperty.bind(this)
  }

  // this handler handle address covert event on search box submit
  // this handler also responsible for initialize ajax call
  handleSubmit(event) {
    // breaking the address into seperate elements
    event.preventDefault();
    const googleAddress = document.getElementById('searchBox').value
    // gate keeper. If no address enter, return
    if (!googleAddress) return;
    // call helperfunction to obtain address for open data calgary
    const address = AddressHelper.convertGoogleAddress(googleAddress)

    // setTimeout(() => { google.maps.event.trigger(map, "resize") }, 1);
    // update address query state and start querying open data
    this.setState({ address: address }, () => {
      LocationBuilder.constructPropertyInfo(this.state.address, this.addProperty, () => {
        if(this.state.locations.length > 0) {
          // resize the map wait until page fully setup to animate map
          this.pageChangeHandler("propertyList")
        }
      })
    });
    document.getElementById('searchBox').value = '';
  }

  // take in a newLocation with complete into and add to state.locations array
  addProperty(newLocation, flood){
    newLocation.flood = flood;    
    const oldState = this.state
    oldState.locations.push(newLocation)
    this.setState(oldState, () => {
      console.log("locations", this.state.locations);
    });
    // add a populationData property to state.locations.newLocation
    this.addPopulationData(newLocation);
    
    // reset propertyValues of state
    this.addPropertyValues(newLocation);
    
  }
  
  // take in a newLocation, and assign a new property called populationData
  // that holds population number over 5 years
  addPopulationData(newLocation){
    let populationChange = [];
    newLocation.comm_population.reverse().forEach(each => {
      populationChange.push(each.population);  
    })

    // collect data for line chart
    newLocation.populationData = {
      labels: ['2013', '2014', '2015', '2016', '2017'],
      datasets:[
        {
          label:'Population',
          data:populationChange,
          backgroundColor:'rgba(255, 99, 132, 0.6)'
        }
      ]
    }
  }

  // take in a newLocation and create an obj for each newLocation, 
  // then add to propertyValues.datasets array
  addPropertyValues(newLocation){
    const colors = [
    '255, 99, 132',
    '54, 162, 235',
    '255, 206, 86',
    '75, 192, 192',
    '153, 102, 255'
    ]
    const oldPropertyValues = this.state.propertyValues;

    // create or empty datasets in oldPropertyValues
    oldPropertyValues.datasets = [];
    this.state.locations.forEach(function(location, index){
      // stores newLocation assessment value of recent 5 years in price array  
      let price = [];
      location.value.forEach(each => {
        price.push(Number(each.price))
      })
      // assign all properties to newLocation
      let newObj = {
        label: location.address,
        backgroundColor: `rgba( ${colors[index]}, 0.6)`,
        borderColor: "black",
        borderWidth: 1,
        data: price.reverse(),
        hoverBackgroundColor: `rgba( ${colors[index]}, 0.8)`,
        hoverBorderColor: `rgba( ${colors[index]}, 1)`,
      }
      // datasets contains newObj for each location
      oldPropertyValues.datasets.push(newObj);
    }) 

    this.setState(oldPropertyValues, () => {
      // console.log("---this.state.propertyValues", this.state.propertyValues);
    })
  }

  deletePropertyValues(address){
    let oldDatasets = this.state.propertyValues.datasets.filter(obj => {
      return obj.label !== address
    });
    this.setState({
      propertyValues: {
        datasets: oldDatasets
    }
    })
  }
  deleteProperty(address) {
    let properties = this.state.locations.filter(location => {
      return location.address !== address
    });
    this.setState({ locations: properties}, () => {
      if (this.state.locations.length === 0) {
        this.pageChangeHandler("searchBox")
      }
    })
    // remove data of deleted address on bar chart
    this.deletePropertyValues(address);
  }

  pageChangeHandler(page) {
    console.log(this.state.locations.length)
    this.setState({ page }, () => {
      if (page === "propertyList" && this.state.locations.length > 0){
        setTimeout(mapAnimator.mapForwardsAnimator, 10)
      } else if (this.state.locations.length === 0) {
        setTimeout(mapAnimator.mapBackwardsAnimator, 10)
      }
    })
  }

  showChart(){
    console.log("modal clicked");
    document.getElementById('bar-chart').classList.toggle("hidden")
  }
  render() {
    let renderedCompoenent;
    if (this.state.page === "choropleth") {
    renderedCompoenent = (
      <div>
        <Navbar
          handleSubmit={this.handleSubmit}
          pageChangeHandler={this.pageChangeHandler}
        />
        <ChoroplethMap />
      </div>
    )
    } else if (this.state.locations.length > 0) {
      renderedCompoenent = (
        <div>
          <Navbar
            handleSubmit={this.handleSubmit}
            pageChangeHandler={this.pageChangeHandler}
          />
          <PropertyList locations={this.state.locations} page={this.state.page} propertyValues={this.state.propertyValues} deleteProperty={this.deleteProperty} showChart={this.showChart}/>
        </div>
        )
    } else if (this.state.locations.length < 1) {
      renderedCompoenent = (
        <div>
          <SearchBox handleSubmit={this.handleSubmit} />
          <PropertyList locations={this.state.locations} deleteProperty={this.deleteProperty} pageChangeHandler={this.pageChangeHandler}/>
        </div>
       )
      }

    return (
      <div className="App">
        {renderedCompoenent}
      </div>
    )
  }
}

export default App;
