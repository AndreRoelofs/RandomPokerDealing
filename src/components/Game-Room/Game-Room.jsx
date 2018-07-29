
import React from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './Game-Room.scss';
import { connect } from 'react-redux';
import Game from '../Game/Game';


const possibleSuits = ['D', 'S', 'H', 'C'];
const possibleCourts = ['2', '3', '4', '5', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
let test = null;

const GameRoom = ({ setGames, games, players }) => {
  const winner = (players.player1.score > players.player2.score) ? players.player1.name : players.player2.name;
  console.log(players.player1.score);
  console.log(players.player2.score);
  const openFile = event => {
    test = setGames;
    readTextFile(event);
  };

  return (
    <div className="game-room-root">
      <Button variant="contained" color="primary" className="main-button left">
        <input type="file" onChange={event => { openFile(event); }} />
      </Button>
      <Button variant="contained" color="primary" className="main-button right">
        Generate Games
      </Button>
      <div className="winner-container">
        <h3 className="winner-name">
          {winner}
        </h3>
        <h3 className="winner-label">
        WON
        </h3>
        <Button variant="contained" color="primary" className="long-button">
        Show Games
        </Button>
      </div>
      <Game matches={games} />
    </div>
  );
};

GameRoom.propTypes = {
  setGames: propTypes.func.isRequired,
  games: propTypes.arrayOf(propTypes.string).isRequired,
  players: propTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  games: state.gamesReducer,
  players: state.playerReducer,
});

const mapDispatchToProps = dispatch => ({
  setGames: games => {
    dispatch({
      type: 'SET_GAMES',
      payload: games,
    });
  },
});

export const processGamesFile = gamesFile => {
  const games = gamesFile.split('\n');
  test(games);
  return games;
};

export const readTextFile = event => {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = processGamesFile;
  reader.onload = () => {
    processGamesFile(reader.result);
  };
  reader.readAsText(input.files[0]);
};

export const generateMatches = numberOfGames => {
  const games = [];
  for (let i = 0; i < numberOfGames; i += 1) {
    const round = generateRound();
    games.push(round);
  }
  return games;
};

export const generateRound = () => {
  let cards = '';
  let numberOfCards = 0;

  while (numberOfCards < 10) {
    const card = createRandomCard();
    if (cards.indexOf(card) === -1) {
      cards += `${card} `;
      numberOfCards += 1;
    }
  }

  cards = cards.slice(0, -1);
  return cards;
};

const createRandomCard = () => getRandomCourt() + getRandomSuit();

const getRandomSuit = () => possibleSuits[Math.floor(Math.random() * possibleSuits.length)];
const getRandomCourt = () => possibleCourts[Math.floor(Math.random() * possibleCourts.length)];


export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
