import React, { Component } from 'react';
import PropertyList from './components/PropertyList.jsx';
import SearchBox from './components/SearchBox.jsx'
import LocationHelper from "./lib/LocationHelper"
import LocationBuilder from "./lib/LocationBuilder"

class App extends Component {
  constructor(){
    super()
    this.state = {
      city: '',
      query: 'Search',
      address: '',
      locations: [],
      landing: true,
      main: false,
      heatMap: false
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  quadrants = {
    southwest: 'SW',
    northwest: 'NW',
    southeast: 'SE',
    northeast: 'NE',
  }
 
   roadname = {
     avenue:'AV',
     ave:'AV',
     alley:'AL',
     bay:'BA',
     boulevard:'BV',
     cape:'CA',
     center:'CE',
     circle:'CI',
     close:'CL',
     common:'CM',
     court:'CO',
     cove:'CV',
     crescent:'CR',
     drive:'DR',
     gardens:'GD',
     gate:'GA',
     green:'GR',
     grove:'GV',
     heath:'HE',
     heights:'HT',
     highway:'HI',
     hill:'HL',
     island:'IS',
     landing:'LD',
     lane:'LN',
     link:'LI',
     manor:'MR',
     mews:'MW',
     mount:'MT',
     parade:'PR',
     park:'PA',
     parkway:'PY',
     passage:'PS',
     path:'PH',
     place:'PL',
     plaza:'PZ',
     point:'PT',
     rise:'RS',
     road:'RD',
     row:'RO',
     square:'SQ',
     street:'ST',
     terrace:'TC',
     trail:'TR',
     view:'VW',
     villas:'VI',
     walk:'WK',
     walkway:'WK',
     way:'WY'
   }

  handleSubmit(event) {
    // breaking the address into seperate elements
    event.preventDefault();

    const address = document.getElementById('searchBox').value
    
    let resultant = address;
 
    resultant = (resultant.split(',')[0]).split(' ');
 
    // working on the elements
    let quadrant = resultant.pop().toLowerCase();
    let road = resultant.pop().toLowerCase();
 
    quadrant = ( this.quadrants[quadrant] ? this.quadrants[quadrant] : quadrant );
    road = ( this.roadname[road] ? this.roadname[road] : road );
 
    // putting the resultant back together
    resultant.push(road);
    resultant.push(quadrant);
    resultant = resultant.join(' ').toUpperCase();
 
  
    // turning the autocomplete bar blank
    this.setState({ address: resultant, landing: false }, () => {
      this.addLocation()
    });
    
    document.getElementById('searchBox').value = '';
    // the 'final product'
    
  }

      /*
    query address from json file, and returns address, comm_code, comm_name, lat, lng, value over years
    */
   componentDidMount(){
     if (this.state.locations.length) {
       this.setState({main: true})
     } else {
       this.setState({main: false})
     }
   }


    addLocation(){
      let newLocation = {};
      LocationHelper.getAddress(this.state.address)
      .then((res) => {
          if (!res.data.length) return;
          LocationBuilder.buildInitialPropertyInfo(newLocation, res.data)
          LocationHelper.getCommPopulation(newLocation.comm_code)
          .then((res) => {
            LocationBuilder.addCommunityPopulationToLocation(newLocation, res.data)
              LocationHelper.getCrime(newLocation.comm_name)
              .then(res => {
                LocationBuilder.addCommunityCrimeToLocation(newLocation, res.data)
                  LocationHelper.getFloodChance(newLocation.lat, newLocation.lng)
                  .then((res) => {
                      newLocation.flood = Boolean(res.data.length)
                      const oldState = this.state
                      oldState.locations.push(newLocation)
                      this.setState(oldState, () => {
 
                      })
                  })
              })
          })
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
