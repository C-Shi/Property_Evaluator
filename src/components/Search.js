import React, { Component } from 'react';
import '../style/Search.css';

class Search extends Component {
  componentDidMount(){
    console.log(process.env)
  }

  render() {
    return (
      <div className="search">
      
              <div class="input-group mb-3">
                <input type="text" class="form-control search-bar" placeholder="Search here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary search-btn" type="button" id="button-addon2"> <i class="fa fa-search" aria-hidden="true"></i></button>
                  </div>
                </div>
      </div>
    );
  }
  }
export default Search
