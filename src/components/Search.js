import React, { Component } from 'react';
import '../style/Search.css';

class Search extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="search">

              <div className="input-group mb-3">
                <input type="text" className="form-control search-bar" placeholder="Search here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary search-btn" type="button" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
                  </div>
                </div>
      </div>
    );
  }
  }
export default Search
