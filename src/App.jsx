import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import './App.scss';
import Hand from './components/Hand/Hand';

const App = () => (
  <div className="App">
    <Header />
    <Hand cards="2D 9C AS AH AC" />
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
