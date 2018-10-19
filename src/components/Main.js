import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search.jsx'
import DisplayMap from './DisplayMap.js'
import Comparison from './Comparison.js'
import getData from '../lib/getData'



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
            }],
            detail: {}
        }
    }

    componentDidMount(){
        getData((result) => {
            console.log(result)
            this.setState({
                detail: result[0]
            })
        })
    }

    render() {
    return (
        <div className="main-page">
            Main Page
        <DisplayMap locations={this.state.locations}/>
        <Comparison detail = {this.state.detail} />
        </div>
    );
    }
}
export default Main;
