import React, { Component } from 'react';
import Script from 'react-load-script';
import '../style/Search.css';
import {formatAddress} from '../utility/search_helper'

class SearchContainer extends Component {

  constructor(props) {

    super(props);

    this.state = {
      city: '',
      query: 'Search'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // quadrants = {
 //   southwest: 'SW',
 //   northwest: 'NW',
 //   southeast: 'SE',
 //   northeast: 'NE'
 // }

 /** handleSubmit
 * activated on an event, returns an object with a google address and a formatted address.
 * params {Object}event the event that gets called.
 */
 handleSubmit(event) {
   // breaking the address into seperate elements
   event.preventDefault();
   let resultant = this.state.query;
   console.log(resultant);
   resultant = (resultant.split(',')[0]).split(' ');

   // working on the quadrant
   let quadrant = resultant.pop();

   // const quadrantValues = (/([southwest][southeast][northwest][northeast])/i);

   // quadrant = quadrant.replace(quadrantValues, (string) => {
   //   // console.log('inside the replacer function', string);
   // });

   // putting the resultant back together
   resultant.push(quadrant);

   // turning the autocomplete bar blank
   this.setState({ query: '' });
   document.getElementById('autocomplete').value = '';

   // the 'final product'
   console.log(resultant.join(' '));
 }

  componentDidMount(){
  }

  render() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAP + "&libraries=places"
    console.log(url);
    return (
      <div className="search">
          <div className="input-group mb-3">
          <form>
            <input onKeyPress={this.handleChange} type="text" className="form-control search-bar" id="autocomplete" defaultValue={this.query} aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">

              <button className="btn btn-outline-secondary search-btn" onClick={this.handleSubmit} id="button-addon2"> <i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
            </form>
          </div>

          <Script url={url} onLoad={this.handleScriptLoad} />

      </div>
    );
  }
  }
export default SearchContainer
