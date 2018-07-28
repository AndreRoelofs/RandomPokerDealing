import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import './App.scss';
import Game from './components/Game/Game';
import GameRoom from './components/Game-Room/Game-Room';

const App = () => (
  <div className="App">
    <Header />
    <GameRoom />
  </div>
);


export default App;
