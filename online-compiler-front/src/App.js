import React, { Component } from 'react';
import './App.css';
import OnlineCompileApp from './component/OnlineCompileApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <OnlineCompileApp />
      </div>
    );
  }
}

export default App;