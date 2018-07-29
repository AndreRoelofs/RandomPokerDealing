import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WebFont from 'webfontloader';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import GameRoom from './components/Game-Room/Game-Room';

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GAMES':
      return action.payload;
    case 'GET_GAMES':
      return state;
    default:
      return state;
  }
};

const initialPlayersState = {
  player1: { name: 'player1', score: 0 },
  player2: { name: 'player2', score: 0 },
};
const playerReducer = (state = initialPlayersState, action) => {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      if (action.payload.name === state.player1.name) {
        return {
          ...state,
          player1: {
            ...state.player1,
            score: state.player1.score + 1,
          },
        };
      }
      if (action.payload.name === state.player2.name) {
        return {
          ...state,
          player2: {
            ...state.player2,
            score: state.player2.score + 1,
          },
        };
      }
      console.log('Nobody won a game');
      break;

    default:
      break;
  }
  return state;
};

const store = createStore(combineReducers({ gamesReducer, playerReducer }));
WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
