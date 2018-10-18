import React, {Component} from 'react';
import NeighborInfo from './NeighborInfo';

class Comparison extends Component {
    componentDidMount(){
      console.log(process.env)
      console.log(process.env.GOOGLE_MAP_API_KEY)
    }
  
    render() {
      return (
        <div className="main-page">
            Comparison
            <NeighborInfo />
        </div>
      );
    }
}

export default Comparison;