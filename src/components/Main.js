import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search.js'
import DisplayMap from './DisplayMap.js'
import Comparison from './Comparison.js'



class Main extends Component {
    constructor(){
        super();
        this.state = {
            locations: [{
                lat:51.044270, 
                lng: -114.062069
            },
            {
                lat: 51.078621,
                lng: -114.136719
            }
        
        ]
            
        }
    }
  
    componentDidMount(){
    console.log(process.env)
    console.log(process.env.GOOGLE_MAP_API_KEY)
  }

  render() {
    return (
      <div className="main-page">
          Main Page
      <DisplayMap locations={this.state.locations}/>
        <Comparison />
      </div>
    );
  }
}
export default Main;
