import React, { Component } from 'react';

import SearchContainer from './Search'
import Map from './Map'

class Landing extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="Landing">
      <SearchContainer />
      <Map />

      </div>
    );
  }
}
export default Landing
