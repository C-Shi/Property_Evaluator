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
          <a className="navbar-brand"
             onClick={(e) => {
              e.preventDefault();
              this.props.pageChangeHandler("propertyList")
             }} >
             Real Map
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link"
                   onClick={(e) => {
                     e.preventDefault()
                     this.props.pageChangeHandler("choropleth")
                    }}
                >Heat Map <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={this.props.handleSubmit} className="form-inline my-lg-0 navbar-search">
            <input type="text" id="searchBox" name="address" className="form-control mr-sm-2" placeholder="add another address to compare?"/>
            <button className="btn btn-outline-secondary my-2 my-sm-0" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i> Search</button>
        </form>

      </nav>
    );
  }
}
export default Navbar