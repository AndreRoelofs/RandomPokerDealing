import React from 'react';
import propTypes from 'prop-types';
import { generateUniqueKeysForItems } from '../../Helper';
import PlayingCard, { getCardCourt, getCardValue, getCardSuite } from '../Playing-Card/Playing-Card';
import Round from '../Round/Round';

const Game = ({ matches }) => {
  const matchObjects = generateUniqueKeysForItems(matches);
  // const matchesToShow = matchObjects.slice(1, Math.min(matchObjects.length, 10) + 1);
  // return matchesToShow.map(element => <Round key={element.id} cards={element.value} />);
  return matchObjects.map(element => <Round key={element.id} cards={element.value} />);
};

Game.propTypes = { matches: propTypes.arrayOf(propTypes.string).isRequired };

export default Game;
