import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import './App.scss';
import Hand from './components/Hand/Hand';
import Round from './components/Round/Round';

const App = () => (
  <div className="App">
    <Header />
    <Round cards="2H 2D 4C 4D 4S 3C 3D 3S 9S 9D" />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">
Welcome to React
      </h1>
    </header>
    <p className="App-intro">
        To get started, edit
      {' '}
      <code>
src/App.js
      </code>
      {' '}
and save to reload.
    </p>
  </div>
);


export default App;
