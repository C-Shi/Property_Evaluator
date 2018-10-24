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
          <h1 class="display-5 typewriter">Type an address, get REAL data</h1><br></br>
              <form onSubmit={this.props.handleSubmit} className="form-inline">
                <input type="text" id="searchBox" name="address" className="form-control" placeholder="Enter an address to get its information"/>
                <button name="search" className="btn btn-outline-secondary search-btn" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i> Search</button>
              </form>
          </div>
        </div>

      );
  }
}
export default SearchBox;
