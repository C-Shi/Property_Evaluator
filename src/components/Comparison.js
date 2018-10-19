import React, {Component} from 'react';
import NeighborInfo from './NeighborInfo';

class Comparison extends Component {
    componentDidMount(){

    }

    render() {
      return (
        <div className="main-page">
            Comparison
            <NeighborInfo locations={this.props.locations}/>
        </div>
      );
    }
}

export default Comparison;