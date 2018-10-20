// import React
import React, { Component } from 'react';
// import Component
import PropertyList from './components/PropertyList.jsx';
import SearchBox from './components/SearchBox.jsx'
// import helper
import LocationBuilder from "./lib/LocationBuilder";
import AddressHelper from "./lib/AddressHelper";

class App extends Component {
  constructor(){
    super()
    this.state = {
      address: '',
      locations: [],
      landing: true,
      main: false,
      heatMap: false
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.addProperty = this.addProperty.bind(this)
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
    // resize the map
    document.getElementById('map').classList.toggle("map-move");
    // setTimeout(() => { google.maps.event.trigger(map, "resize") }, 1);
    // update address query state and start querying open data
    this.setState({ address: address, landing: false }, () => {
      LocationBuilder.constructPropertyInfo(this.state.address, this.addProperty)
    });
    document.getElementById('searchBox').value = '';
  }

  // take in a newLocation with complete into and add to state.locations array
  addProperty(newLocation, flood){
    newLocation.flood = flood
    const oldState = this.state
    oldState.locations.push(newLocation)
    this.setState(oldState, () => {
    })
  }

  render() {
    return (
      <div className="App">
      <SearchBox handleSubmit={this.handleSubmit}/>
      <PropertyList locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
