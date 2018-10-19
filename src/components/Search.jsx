import React, { Component } from 'react';
import Script from 'react-load-script';
import '../style/Search.css';

// class SearchPresenter extends Component {
//   render() {

//     return (
//       <div className="search">

//           <div className="input-group mb-3">
//             <input onKeyPress={this.props.handleChange} type="text" className="form-control search-bar" id="autocomplete" defaultValue={this.props.query} aria-label="Recipient's username" aria-describedby="button-addon2" />
//             <div className="input-group-append">
//               <button className="btn btn-outline-secondary search-btn" type="button" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
//             </div>
//           </div>

//           <Script url="https://maps.googleapis.com/maps/api/js?key={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places" onLoad={this.props.handleScriptLoad} />

//       </div>
//     );

//   }
// }

class SearchContainer extends Component {

  constructor(props) {

    super(props);

    this.state = {
      city: '',
      query: 'Search'
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

  }

  handleScriptLoad() {

    // Declare options for autocomplete
    var options = { types: [], };

    // Initialize google autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {

    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState({
          city: address[0].long_name,
          query: addressObject.formatted_address
      });
    }
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  componentDidMount(){
  }

  render() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAP + "&libraries=places"
    return (
      <div className="search">

          <div className="input-group mb-3">
            <input onKeyPress={this.handleChange} type="text" className="form-control search-bar" id="autocomplete" defaultValue={this.query} aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary search-btn" type="button" id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
          </div>

          <Script url={url} onLoad={this.handleScriptLoad} />

      </div>
    );
  }
  }
export default SearchContainer
