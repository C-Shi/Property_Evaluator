import React, { Component } from 'react';
import './style/App.css';

class App extends Component {
  componentDidMount(){
    console.log(process.env)
  }

  render() {
    return (
      <div className="App"> Hello
      </div>
    );
  }
}

export default App;
