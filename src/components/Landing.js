import React, { Component } from 'react';

import Search from './Search.js'
import Map from './Map'

class Landing extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="Landing">
      <Search />
      <Map />

      </div>
    );
  }
}
export default Landing
