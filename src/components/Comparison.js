import React, {Component} from 'react';
import NeighborInfo from './NeighborInfo';

class Comparison extends Component {
    componentDidMount(){

    }

    render() {
      return (
        <div className="main-page">
            Comparison
            <NeighborInfo detail={this.props.detail}/>
        </div>
      );
    }
}

export default Comparison;