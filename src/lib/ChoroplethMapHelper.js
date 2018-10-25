import axios from 'axios';

const ChoroplethMapHelper = {
  fetchData: function() {
    return axios.get("http://localhost:4001/api")
  }
}

export default ChoroplethMapHelper