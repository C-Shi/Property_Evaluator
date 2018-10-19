import axios from 'axios';

const getCommPopulation = function(comm_code){
    return axios.get('https://data.calgary.ca/resource/eme4-y5m7.json',{
        params: {
        comm_code,
        "$limit": 10,
        "$order": "census_year DESC"
        }
    })
}

export default getCommPopulation;