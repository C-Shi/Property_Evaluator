import React, { Component } from 'react';
import Script from 'react-load-script';
import '../style/Search.css';
import {formatAddress} from '../utility/search_helper'

class SearchContainer extends Component {

  constructor(props) {

    super(props);


    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleScriptLoad = this.handleScriptLoad.bind(this);
    // this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

  }


  render() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAP + "&libraries=places"
    console.log(url);
    return (
      <div className="search">
          <div className="input-group mb-3">
          <form>
            <input onInput={this.props.handleChange} type="text" className="form-control search-bar" id="autocomplete" defaultValue={this.query} aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">

              <button className="btn btn-outline-secondary search-btn" onClick={this.props.handleSubmit} id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
            </form>
          </div>

          <Script url={url} onLoad={this.handleScriptLoad} />

      </div>
    );
  }
  }
export default SearchContainer
