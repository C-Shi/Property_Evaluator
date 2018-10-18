import React, { Component } from 'react';
import Map from './Map.js'
import Search from './Search.js'

class Landing extends Component {
  componentDidMount(){
    console.log(process.env)
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
