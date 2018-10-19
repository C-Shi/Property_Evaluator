import React, { Component } from 'react';

import SearchPresenter from './Search'
import Map from './Map'

class Landing extends Component {
  componentDidMount(){
    console.log(process.env)
    console.log(process.env.GOOGLE_MAP_API_KEY)
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
