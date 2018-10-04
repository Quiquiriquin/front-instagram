import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Route';

class App extends Component {
  render() {
    return (
      <div>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
