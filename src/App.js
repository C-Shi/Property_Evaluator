import React, { Component } from 'react';
import Landing from './components/Landing.js'

class App extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="App">

      <Landing />
      <Main />
      </div>
    );
  }
}

export default App;
