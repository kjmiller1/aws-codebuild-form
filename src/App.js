import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form/Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AWS CodeBuild Form</h1>
        </header>
        <Form />
      </div>
    );
  }
}

export default App;
