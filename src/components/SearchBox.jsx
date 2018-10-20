import React, { Component } from 'react';
import '../style/SearchBox.css'

class SearchBox extends Component {

  componentDidMount() {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('searchBox'));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const circle = new googleMaps.Circle({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
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