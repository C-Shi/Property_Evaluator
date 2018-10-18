import React, { Component } from 'react';

class Map extends Component {
  componentDidMount(){
    console.log(process.env)
  }

  render() {
    return (
      <div className="Map">
      <h1>Map</h1>
      <div id="map"></div>
      </div>
    );
  }
}
export default Map