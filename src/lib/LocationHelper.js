import axios from 'axios';

const LocationHelper = {
  getAddress: function (address){
    return axios.get('https://data.calgary.ca/resource/6mnx-r99s.json',{
        params: {
        address
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
        "$limit": 10,
        "$order": "census_year DESC"
        }
    })
  },

  getFloodChance: function(lat, lng){
    const query = `within_circle(polygon, ${lat}, ${lng}, 1000)`
    return axios.get('https://data.calgary.ca/resource/ntse-tznh.json',{
        params: {
          "$where": query
        }
    })
  }

}

export default LocationHelper