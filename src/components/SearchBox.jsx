import React, { Component } from 'react';


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
          <div>Hello Google</div>
          <form onSubmit={this.props.handleSubmit}>
            <input type="text" id="searchBox" name="address"/>
            <button>Search</button>
          </form>
        </div>

      );
  }
}
export default SearchBox;