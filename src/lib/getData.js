import axios from 'axios';

const getData = function(cb){
    axios.get('https://data.calgary.ca/resource/6mnx-r99s.json',{
        params: {
        address: '132 10 AV NW',
        'ROLL_YEAR': '2010'
        }
    })
    .then(function (response){
        cb(response.data);
    })
}

export default getData;




