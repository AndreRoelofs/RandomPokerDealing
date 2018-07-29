
import React from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './Game-Room.scss';
import { connect } from 'react-redux';
import Game from '../Game/Game';
import WinnerDetails from '../Winner-Details/Winner-Details';


const possibleSuits = ['D', 'S', 'H', 'C'];
const possibleCourts = ['2', '3', '4', '5', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const GameRoom = ({ setMatches, matches, players, resetScore }) => {
  const { player1, player2 } = players;
  let winner = null;
  if (player1.score > 0 || player1.score > 0) {
    winner = (player1.score > player2.score)
      ? player1 : player2;
  }

  const readTextFile = event => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = processGamesFile;
    reader.onload = () => {
      resetScore();
      setMatches(processGamesFile(reader.result));
    };
    reader.readAsText(input.files[0]);
  };

  const processGamesFile = gamesFile => {
    const retrievedMatches = gamesFile.split('\n');
    retrievedMatches.pop();
    return retrievedMatches;
  };

  return (
    <div className="game-room-root">
      <Button variant="contained" color="primary" className="main-button left">
        <input type="file" onChange={event => { readTextFile(event); }} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          resetScore();
          setMatches(generateMatches(100));
        }}
        className="main-button right"
      >
        Generate Games
      </Button>
      <WinnerDetails winner={winner} />
      <Game matches={matches} />
    </div>
  );
};

GameRoom.propTypes = {
  setMatches: propTypes.func.isRequired,
  players: propTypes.shape({}).isRequired,
  matches: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = state => ({
  matches: state.gamesReducer,
  players: state.playerReducer,
});

const mapDispatchToProps = dispatch => ({
  setMatches: games => {
    dispatch({
      type: 'SET_GAMES',
      payload: games,
    });
  },
  resetScore: () => {
    dispatch({
      type: 'RESET_SCORE',
    });
  },
});


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
