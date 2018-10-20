import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search.jsx'
import DisplayMap from './DisplayMap.js'
import Comparison from './Comparison.js'
import LocationHelper from "../lib/LocationHelper"


class Main extends Component {

    render() {
        return (
            <div className="main-page">
                Main Page
            {/* <DisplayMap locations={this.props.locations}/> */}
            <Comparison locations = {this.props.locations} />
            </div>
        );
    }
}
export default Main;
