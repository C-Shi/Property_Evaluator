import axios from "axios"
import LocationFinder from "./LocationFinder"
const LocationBuilder = {
  buildInitialPropertyInfo: function (newLocation, data){
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
  },

  addCommunityPopulationToLocation: function (newLocation, data){
    newLocation.comm_population = [];
    data.forEach((community) => {
        newLocation.comm_population.push({
            year: community.census_year.slice(0, 4),
            population: community.population
        })
    })
  },
  addCommunityCrimeToLocation: function (newLocation, data){
    newLocation.crime = {}
    data.forEach((crime) => {
        if (newLocation.crime[crime.category]) {
            newLocation.crime[crime.category] += Number(crime.count)
        } else {
            newLocation.crime[crime.category] = Number(crime.count)
        }
    })


  },

  addWalkScoreToLocation: function (newLocation, data) {
      newLocation.walkScore = {
          score: data.walkscore,
          description: data.description
      }
      newLocation.transitScore = {
          score: data.transit.score,
          description: data.transit.description
      }
  },

  addTrafficAccident: function(newLocation, data) {
    newLocation.accident = {}
  },

  // this function is querying differnt open data calgary API in sequence
  constructPropertyInfo: function(address, callback, callback2){
    let newLocation = {};
    LocationFinder.getAddress(address)
    .then((res) => {
        if (!res.data.length) return;
        this.buildInitialPropertyInfo(newLocation, res.data)
        LocationFinder.getCommPopulation(newLocation.comm_code)
        .then((res) => {
          this.saveSearch(res.data[0].name)
          .then(() => { return ;})
          this.addCommunityPopulationToLocation(newLocation, res.data)
          LocationFinder.getCrime(res.data[0].name)
          .then(res => {
              this.addCommunityCrimeToLocation(newLocation, res.data)
              LocationFinder.getWalkScore(newLocation)
              .then(res => {
                  this.addWalkScoreToLocation(newLocation, res.data)
                  LocationFinder.getFloodChance(newLocation.lat, newLocation.lng)
                  .then((res) => {
                      // all info is ready in a templateVar 'newLocation'
                      // ready to update locations lists
                      callback(newLocation, Boolean(res.data.length))
                      callback2();
                  })
              })
              // if for some reason walkscore api call is not succeed, will add err message to display
              // and will still need to request flood issue
              .catch(err => {
                  const noFound = {
                      walkscore: '',
                      description: `${err.message}`,
                      transit: {
                          score: '',
                          description: `${err.message}`
                      }
                  }
                  this.addWalkScoreToLocation(newLocation, noFound)
                  LocationFinder.getFloodChance(newLocation.lat, newLocation.lng)
                  .then((res) => {
                      // all info is ready in a templateVar 'newLocation'
                      // ready to update locations lists
                      callback(newLocation, Boolean(res.data.length))
                      callback2();
                  })
              })
          })
        })
    })
  },
  // this method will post search community to express and return a promise
  saveSearch: function(community) {
    return axios({
        method: "post",
        url: "http://localhost:3001/api/search",
        data: {
            community
        }
    })
  },
}

export default LocationBuilder
