import React, { Component } from 'react';

import SearchContainer from './Search'

class Landing extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="Landing">
      <SearchContainer handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} display={this.props.display}/>
      </div>
    );
  }
}
export default Landing

