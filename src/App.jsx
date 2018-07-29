import React from 'react';
import Header from './components/Header/Header';
import './App.scss';
import GameRoom from './components/Game-Room/Game-Room';


const App = () => (
  <div className="App">
    <Header />
    <GameRoom />
  </div>
);


export default App;
