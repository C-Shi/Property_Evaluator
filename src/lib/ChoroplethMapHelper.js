import axios from 'axios';

const ChoroplethMapHelper = {
  getAllCrime: function(){
    return axios.get('https://data.calgary.ca/resource/kudt-f99k.json',{
      params: {
        "$select": "community_name, SUM(count)",
        year: 2018,
        "$group": "community_name"
      }
    })
  }
}

export default ChoroplethMapHelper