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

    // resize the map wait until page fully setup to animate map
    this.pageChangeHandler("propertyList")
    // setTimeout(() => { google.maps.event.trigger(map, "resize") }, 1);
    // update address query state and start querying open data
    this.setState({ address: address, landing: false }, () => {
      LocationBuilder.constructPropertyInfo(this.state.address, this.addProperty)
    });
    document.getElementById('searchBox').value = '';
  }

  // take in a newLocation with complete into and add to state.locations array
  addProperty(newLocation, flood){
    newLocation.flood = flood;    
    const oldState = this.state
    oldState.locations.push(newLocation)
    this.setState(oldState, () => {
      console.log(this.state.locations);
    })
    this.addPropertyValues(newLocation);
  }

  addPropertyValues(newLocation){
    const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)'
    ]
    const oldPropertyValues = this.state.propertyValues;

    const found = this.state.locations.forEach(function(location){
      return location.address === newLocation.address
    })

    if(found == undefined){
      oldPropertyValues.datasets = [];
      this.state.locations.forEach(function(location, index){
        let price = [];
        location.value.reverse().forEach(each => {
          price.push(Number(each.price))
        })
        let newObj = {
          label: location.address,
          backgroundColor: String(colors[index]),
          borderColor: "black",
          borderWidth: 1,
          data: price,
          hoverBackgroundColor: 'rgba(155,49,12,0.4)',
          hoverBorderColor: 'rgba(155,59,12,1)',
        }
        oldPropertyValues.datasets.push(newObj);
      }) 
    }
    this.setState(oldPropertyValues, () => {
      console.log("--------", this.state.propertyValues);
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
    this.setState({
      locations: properties
    })
    this.deletePropertyValues(address);
  }

  pageChangeHandler(page) {
    this.setState({ page }, () => {
      if (page === "propertyList"){
        setTimeout(mapAnimator, 10)
      }
    })
  }

  render() {
    let renderedCompoenent;
    if (this.state.page === "propertyList") {
      renderedCompoenent = (
        <div>
          <Navbar
            handleSubmit={this.handleSubmit}
            pageChangeHandler={this.pageChangeHandler}
          />
          <PropertyList locations={this.state.locations} page={this.state.page} propertyValues={this.state.propertyValues} deleteProperty={this.deleteProperty}/>
        </div>
        )
    } else if (this.state.page === "searchBox") {
      renderedCompoenent = (
        <div>
          <SearchBox handleSubmit={this.handleSubmit} />
          <PropertyList locations={this.state.locations} deleteProperty={this.deleteProperty}/>
        </div>
       )
    }else if (this.state.page === "choropleth") {
      renderedCompoenent = (
        <div>
          <Navbar
            handleSubmit={this.handleSubmit}
            pageChangeHandler={this.pageChangeHandler}
          />
          <ChoroplethMap />
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
