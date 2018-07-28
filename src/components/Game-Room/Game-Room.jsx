
import React from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './Game-Room.scss';
import { createStore } from 'redux';

const GameRoom = () => (
  <div className="game-room-root">
    <Button variant="contained" color="primary" className="main-button left">
      <input type="file" onChange={processGamesFile} />
    </Button>
    <Button variant="contained" color="primary" className="main-button right">
        Generate Games
    </Button>
    <div className="winner-container">
      <h3 className="winner-name">
        Player 1
      </h3>
      <h3 className="winner-label">
        WON
      </h3>
      <Button variant="contained" color="primary" className="long-button">
        Show Games
      </Button>
    </div>
  </div>
);

export const processGamesFile = gamesFile => gamesFile.split('\n');

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default GameRoom;
