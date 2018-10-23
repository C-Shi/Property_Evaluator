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
    console.log("FLODD",newLocation.flood);
    let valueData = [];
    newLocation.value.forEach(each => {
      return valueData.push(each.price);
    })
    newLocation.chartData = {
      labels: ['2014', '2015', '2016', '2017', '2018'],
      datasets:[
      {
        label:'Value',
        data: valueData,
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ]
      }]

    }
    this.addCrime(newLocation);

    const oldState = this.state
    oldState.locations.push(newLocation)
    this.setState(oldState, () => {
      console.log(this.state.locations);
    });

  }
addCrime(newLocation) {
  let crimeData = [];
         crimeData = Object.keys(newLocation.crime);
         let crimeCount = [];
         crimeCount = Object.values(newLocation.crime);
         newLocation.pieData = {
          labels: crimeData,
       datasets:[
      {
        label:'Value',
         data: crimeCount,
         backgroundColor:[
           'rgba(255, 99, 132, 0.6)',
           'rgba(54, 162, 235, 0.6)',
           'rgba(255, 206, 86, 0.6)',
           'rgba(75, 192, 192, 0.6)',
           'rgba(153, 102, 255, 0.6)',
           'rgba(0, 255, 255, 0.6)',
           'rgba(0, 0, 128, 0.6)',
           'rgba(255, 0, 0, 0.6)',
           'rgba(0, 128, 128, 0.6)',
           'rgba(0, 0, 0, 0.6)'
         ]
       }]
     }
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
          <PropertyList locations={this.state.locations} deleteProperty={this.deleteProperty} pageChangeHandler={this.pageChangeHandler}/>
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
