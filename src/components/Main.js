import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import DisplayMap from './DisplayMap.js'
import Comparison from './Comparison.js'
import getAddress from '../lib/getAddress'
import getCommPopulation from '../lib/getCommPopulation'


class Main extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    /*
    query address from json file, and returns address, comm_code, comm_name, lat, lng, value over years
    */
    buildInitialPropertyInfo(newLocation, data){

            newLocation.address = data[0].address;
            newLocation.comm_code= data[0].comm_code;
            newLocation.comm_name= data[0].comm_name;
            newLocation.lat= data[0].latitude;
            newLocation.lng= data[0].longitude;
            newLocation.value= [];
        data.forEach(location => {
            newLocation.value.push({
            year: location.roll_year,
            price: location.assessed_value
            })
        })
    }
    
    componentDidMount(){
        let newLocation = {};
        getAddress('132 10 AV NW')
        .then((res) => {
            this.buildInitialPropertyInfo(newLocation, res.data)
        })
        .then(() => { 
            getCommPopulation(newLocation.comm_code)
            .then((res) => {
                console.log(res.data);
            })
        })
        
    }
    

    render() {
    return (
        <div className="main-page">
            Main Page
        {/* <DisplayMap locations={this.state.locations}/> */}
        {/* <Comparison detail = {this.state.detail} /> */}
        </div>
    );
    }
}
export default Main;
