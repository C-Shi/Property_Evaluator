import axios from 'axios';

const getCrime = function(comm_name){
    return axios.get('https://data.calgary.ca/resource/kudt-f99k.json',{
        params: {
        community_name: comm_name,
        "$order": "category DESC",
        year: 2018,
        }
    })
}

export default getCrime;