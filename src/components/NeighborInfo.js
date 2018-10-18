import React, {Component} from 'react';

class NeighborInfo extends Component {
    componentDidMount(){
      console.log(process.env)
      console.log(process.env.GOOGLE_MAP_API_KEY)
    }
  
    render() {
      return (
        <div className="neighbor-info">
            NeighborInfo
  
        </div>
      );
    }
  }


export default NeighborInfo;