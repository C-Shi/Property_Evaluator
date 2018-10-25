import React, { Component } from 'react';
import '../style/SearchBox.css';
import GoogleMap from "../lib/GoogleMap"

class SearchBox extends Component {

  componentDidMount() {
    GoogleMap.autocomplete()
  }

  render() {
      return (
        <div>
          <div className="search">
          <h1 className="display-5 typewriter">Type an address, get REAL data</h1><br></br>
              <form onSubmit={this.props.handleSubmit} className="form-inline">
                <input type="text" id="searchBox" name="address" className="form-control-lg" placeholder="Enter an address to get its information"/>
                <button name="search" className="btn btn-outline-secondary btn-lg search-btn" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i> <span className="search-text">Search</span></button>
              </form>
          </div>
        </div>

      );
  }
}
export default SearchBox;
