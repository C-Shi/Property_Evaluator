import React, {Component} from 'react';
import NeighborInfo from './NeighborInfo';

class Comparison extends Component {
    render() {
      const property = this.props.locations.map(location => {
        return <NeighborInfo location={location}/>
      })

      return (
        <div className="main-page">
            {property}
        </div>
      );
    }
}

export default Comparison;