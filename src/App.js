import React, { Component } from 'react';
import Landing from './components/Landing.js'
import Main from './components/Main'
import LocationHelper from "./lib/LocationHelper"

class App extends Component {
  constructor(){
    super()
    this.state = {
      city: '',
      query: 'Search',
      address: '',
      locations: []
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
 
    let resultant = this.state.query;
 
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
    this.setState({ address: resultant }, () => {
      this.addLocation()
    });
    
    document.getElementById('autocomplete').value = '';
    // the 'final product'
    
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleScriptLoad() {

    // Declare options for autocomplete
    var options = { types: [], };

    // Initialize google autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {

    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState({
          city: address[0].long_name,
          query: addressObject.formatted_address
      });
    }
  }

      /*
    query address from json file, and returns address, comm_code, comm_name, lat, lng, value over years
    */
   buildInitialPropertyInfo(newLocation, data){

        newLocation.address = data[0].address;
        newLocation.comm_code= data[0].comm_code;
        newLocation.comm_name= data[0].comm_name;
        newLocation.lat= data[0].latitude;
        newLocation.lng= data[0].longitude;
        newLocation.value= [];
    data.forEach(location => {
        newLocation.value.push({
        year: location.roll_year,
        price: location.assessed_value
        })
    })
  }

    addCommunityPopulationToLocation(newLocation, data){
      newLocation.comm_population = [];
      data.forEach((community) => {
          newLocation.comm_population.push({
              year: community.census_year.slice(0, 4),
              population: community.population
          })
      })
    }

    addCommunityCrimeToLocation(newLocation, data){
      newLocation.crime = {}
      data.forEach((crime) => {
          if (newLocation.crime[crime.category]) {
              newLocation.crime[crime.category] += Number(crime.count)
          } else {
              newLocation.crime[crime.category] = Number(crime.count)
          }
      })
    }

    addLocation(){
      console.log(this.state.address)
      let newLocation = {};
      LocationHelper.getAddress(this.state.address)
      .then((res) => {
          this.buildInitialPropertyInfo(newLocation, res.data)
          LocationHelper.getCommPopulation(newLocation.comm_code)
          .then((res) => {
              this.addCommunityPopulationToLocation(newLocation, res.data)
              LocationHelper.getCrime(newLocation.comm_name)
              .then(res => {
                  this.addCommunityCrimeToLocation(newLocation, res.data)
                  LocationHelper.getFloodChance(newLocation.lat, newLocation.lng)
                  .then((res) => {
                      newLocation.flood = Boolean(res.data.length)
                      const oldState = this.state
                      oldState.locations.push(newLocation)
                      this.setState(oldState, () => {
                        console.log(this.state)
                      })
                  })
              })
          })
      })
    }

    componentDidMount(){
      
    }

  render() {
    return (
      <div className="App">

      <Landing handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      <Main />
      </div>
    );
  }
}

export default App;
