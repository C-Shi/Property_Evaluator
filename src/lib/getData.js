import axios from 'axios';

const getData = function(){
    return axios.get('https://data.calgary.ca/resource/6mnx-r99s.json',{
        params: {
        address: '132 10 AV NW',
        'ROLL_YEAR': '2010'
        }
    })
}

export default getData;




