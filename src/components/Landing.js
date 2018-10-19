import React, { Component } from 'react';

import SearchPresenter from './Search'
import Map from './Map'

class Landing extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="Landing">
      <SearchPresenter />
      <Map />

      </div>
    );
  }
}
export default Landing
