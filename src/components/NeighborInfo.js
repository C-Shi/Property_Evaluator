import React, {Component} from 'react';

class NeighborInfo extends Component {
    componentDidMount(){
  
    }
  
    render() {
      return (
        <div className="neighbor-info">
            NeighborInfo 
            <h1>{this.props.locations.address}</h1>
            <h1>{this.props.locations.assessed_value}</h1>
            <h1>{this.props.locations.comm_name}</h1>
            <h1>{this.props.locations.roll_year}</h1>
        </div>
      );
    }
  }


export default NeighborInfo;