import axios from 'axios';

const LocationFinder = {
  getAddress: function (address){
    return axios.get('https://data.calgary.ca/resource/6mnx-r99s.json',{
        params: {
        address,
        "$order": "roll_year DESC",
        "$limit": 5
        }
    })
  },

  getCrime: function(comm_name){
    return axios.get('https://data.calgary.ca/resource/kudt-f99k.json',{
        params: {
        community_name: comm_name,
        "$order": "category DESC",
        year: 2018,
        }
    })
  },

  getCommPopulation: function(comm_code){
    return axios.get('https://data.calgary.ca/resource/eme4-y5m7.json',{
        params: {
        comm_code,
        "$limit": 5,
        "$order": "census_year DESC"
        }
    })
  },

  getFloodChance: function(lat, lng){
    const query = `within_circle(polygon, ${lat}, ${lng}, 500)`
    return axios.get('https://data.calgary.ca/resource/ntse-tznh.json',{
        params: {
          "$where": query
        }
    })
  },

  getWalkScore: function(location) {
    return axios.get('http://api.walkscore.com/score', {
      params: {
        format: 'json',
        wsapikey: process.env.REACT_APP_WALKSCORE,
        lat: location.lat,
        lon: location.lng,
        transit: 1
      }
    })
  },

}

export default LocationFinder