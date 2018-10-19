import React, {Component} from 'react';

class NeighborInfo extends Component {
    componentDidMount(){
  
    }
  
    render() {
      return (
        <div className="neighbor-info">
            NeighborInfo 
            <h1>{this.props.detail.address}</h1>
            <h1>{this.props.detail.assessed_value}</h1>
            <h1>{this.props.detail.comm_name}</h1>
            <h1>{this.props.detail.roll_year}</h1>
        </div>
      );
    }
  }


export default NeighborInfo;