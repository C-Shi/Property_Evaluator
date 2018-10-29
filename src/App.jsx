// import React
import React, { Component } from 'react';
// import Component
import Navbar from './components/Navbar.jsx';
import PropertyList from './components/PropertyList.jsx';
import SearchBox from './components/SearchBox.jsx'
import ChoroplethMap from "./components/ChoroplethMap";
// import styles
import "./style/index.css"
import "./style/mediaQueries.css"
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
      },
      population:{
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets:[]
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
    if (!address) return ;
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
    // document.getElementById('searchBox').value = '';
  }

  // take in a newLocation with complete into and add to state.locations array
  addProperty(newLocation, flood){
    newLocation.flood = flood;

    this.addCrime(newLocation);

    const oldState = this.state
    oldState.locations.push(newLocation)
    this.setState(oldState, () => {
    });
    // reset propertyValues of state
    this.addPropertyValues(newLocation);
    // reset population of state
    this.addPopulation(newLocation);
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

    this.setState({propertyValues: oldPropertyValues})
  }

  // take in a newLocation and create an obj for each newLocation,
  // then add to population.datasets array
  addPopulation(newLocation){
    const colors = [
    '255, 99, 132',
    '54, 162, 235',
    '255, 206, 86',
    '75, 192, 192',
    '153, 102, 255'
    ]
    const oldPopulation = this.state.population;
    // create or empty datasets in oldPopulation
    oldPopulation.datasets = [];
    this.state.locations.forEach(function(location, index){
      // stores community population of recent 5 years in comm_population array
      let comm_population = [];
      location.comm_population.forEach(each => {
        comm_population.push(Number(each.population))
      })
      // assign all properties to newLocation
      let newObj = {
        label: location.address,
        borderColor: `rgba( ${colors[index]}, 1)`,
        fill: false,
        backgroundColor: `rgba( ${colors[index]}, 0.6)`,
        data: comm_population,
      }
      // datasets contains newObj for each location
      oldPopulation.datasets.push(newObj);
    })
    this.setState({population: oldPopulation})
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

// stateKey could be propertyValues or population
  deletePropertyFromComparison(address, stateKey){
    let oldDatasets = this.state[stateKey].datasets.filter(obj => {
      return obj.label !== address
    });
    this.setState({
      [stateKey]: {
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
    // remove data of deleted address on bar chart and line chart
    this.deletePropertyFromComparison(address, 'propertyValues');
    this.deletePropertyFromComparison(address, 'population')
  }

  pageChangeHandler(page) {
    this.setState({ page }, () => {
      if (page === "propertyList" && this.state.locations.length > 0){
        document.getElementsByClassName('main-page')[0].classList.add('main-page-glass');
        setTimeout(mapAnimator.mapForwardsAnimator, 10)
      } else if (this.state.locations.length === 0 && this.state.page !== "choropleth") {
        setTimeout(mapAnimator.mapBackwardsAnimator, 10)
        document.getElementsByClassName('main-page')[0].classList.remove('main-page-glass');
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
          <PropertyList locations={this.state.locations} page={this.state.page} propertyValues={this.state.propertyValues} population={this.state.population} deleteProperty={this.deleteProperty} pageChangeHandler={this.pageChangeHandler}/>
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
