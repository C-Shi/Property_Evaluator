import axios from 'axios';

const getAddress = function(address){
    return axios.get('https://data.calgary.ca/resource/6mnx-r99s.json',{
        params: {
        address
        }
    })
}

export default getAddress;




