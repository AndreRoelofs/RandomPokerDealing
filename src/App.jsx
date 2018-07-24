import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './app/components/Header/Header';
import PokerIndex from './app/components/Poker/Poker-Index/Poker-Index';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <div>
          <Route exact path="/" component={PokerIndex} />
        </div>
      </Router>
    </div>

  );
}

export default App;
// <div className="App">
//   <Header />
//   <header className="App-header">
//     <h1 className="App-title">
//       Welcome to React
//     </h1>
//   </header>
// </div>
