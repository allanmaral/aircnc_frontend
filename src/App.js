import React from 'react';
import Routes from './routes';

import './services/api'
import './App.css';
import logo from './assets/logo.svg' 

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC Logo "/>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
