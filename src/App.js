import React, { Component } from 'react';
import Landing from './components/Landing.js'
import Main from './components/Main'

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
