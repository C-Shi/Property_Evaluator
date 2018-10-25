import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap"
import "../style/Navbar.css"

class Navbar extends Component {
  componentDidMount() {

    GoogleMap.autocomplete()
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-default">
        <div className="navbar-links">
          <a className="navbar-link"
             onClick={(e) => {
              e.preventDefault();
              this.props.pageChangeHandler("propertyList")
             }} >
             Real Map
          </a>

          <a className="navbar-link"
             onClick={(e) => {
               e.preventDefault()
               this.props.pageChangeHandler("choropleth")
              }}
          >Heat Map
          </a>
        </div>

        <form onSubmit={this.props.handleSubmit} className="form-inline my-lg-0 navbar-search">
            <input type="text" id="searchBox" name="address" className="form-control mr-sm-2" placeholder="add another address to compare?"/>
            <button className="navbar-search-button btn btn-outline-secondary my-2 my-sm-0" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i> <span className="search-text">Search</span></button>
        </form>

      </nav>
    );
  }
}
export default Navbar
