import React, { Component } from 'react';
import Landing from './components/Landing.js'
import Main from './components/Main.js'

class App extends Component {
  componentDidMount(){
    console.log(process.env)
  }

  render() {
    return (
      <div className="App">
      <Main />
      </div>
    );
  }
}

export default App;
