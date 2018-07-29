import React from 'react';
import propTypes from 'prop-types';
import { generateUniqueKeysForItems } from '../../Helper';
import Round from '../Round/Round';

const Game = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return <div />;
  }
  const matchObjects = generateUniqueKeysForItems(matches);
  return matchObjects.map(element => <Round key={element.id} cards={element.value} />);
};

Game.propTypes = { matches: propTypes.arrayOf(propTypes.string).isRequired };

export default Game;
