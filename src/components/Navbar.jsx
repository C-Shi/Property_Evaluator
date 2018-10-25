import React, {Component} from 'react';
import GoogleMap from "../lib/GoogleMap"
import APIModal from "./APIModal"
import "../style/Navbar.css"

class Navbar extends Component {
  componentDidMount() {
    GoogleMap.autocomplete()
    window.$('[data-toggle="tooltip"]').tooltip();
  }
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-default">
        <div className="navbar-links">
          <a className="navbar-link"
             onClick={(e) => {
              e.preventDefault();
              this.props.pageChangeHandler("propertyList")
             }} 
             data-toggle="tooltip" data-placement="bottom" title="Compare values, community populations and safety across properties"
          >Real Map
          </a>

          <a className="navbar-link"
             onClick={(e) => {
               e.preventDefault()
               this.props.pageChangeHandler("choropleth")
              }}
              data-toggle="tooltip" data-placement="bottom" title="Compare population, popularity, crime info across communities"
          >Statistics
          </a>
          <span data-toggle="modal" data-target="#api-usage">
            <a className="navbar-link"
            data-toggle="tooltip" data-placement="bottom" title="For websites or developers who want to access our search data"
             >API
            </a>
          </span>
        </div>

        <form onSubmit={this.props.handleSubmit} className="form-inline my-lg-0 navbar-search">
            <input type="text" id="searchBox" name="address" className="form-control mr-sm-2" placeholder="add another address to compare?"/>
            <button className="navbar-search-button btn btn-outline-secondary my-2 my-sm-0" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i> <span className="search-text">Search</span></button>
        </form>
        
        <APIModal />

      </nav>
    );
  }
}
export default Navbar
