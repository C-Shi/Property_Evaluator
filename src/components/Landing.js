import React, { Component } from 'react';

import Search from './Search.js'
import Map from './Map'

class Landing extends Component {
  componentDidMount(){
    console.log(process.env)
    console.log(process.env.GOOGLE_MAP_API_KEY)
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
