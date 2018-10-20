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
            <div className="input-group mb-3">
              <form onSubmit={this.props.handleSubmit} className="form-inline">
                <input type="text" id="searchBox" name="address"/>
                  <button className="btn btn-outline-secondary search-btn" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
              </form>
            </div>
          </div>
        </div>

      );
  }
}
export default SearchBox;