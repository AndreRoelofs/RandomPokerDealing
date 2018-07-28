import React from 'react';
import propTypes from 'prop-types';
import { generateUniqueKeysForItems } from '../../Helper';
import PlayingCard, { getCardCourt, getCardValue, getCardSuite } from '../Playing-Card/Playing-Card';
import Round from '../Round/Round';

const possibleSuits = ['D', 'S', 'H', 'C'];
const possibleCourts = ['2', '3', '4', '5', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const Game = ({ numberOfMatches = 0, retrievedMatches = [] }) => {
  let matches = [];

  if (retrievedMatches.length === 0) {
    matches = generateMatches(numberOfMatches);
  }
  matches = generateUniqueKeysForItems(matches);

  const matchesToShow = matches.slice(1, Math.min(numberOfMatches, 10) + 1);
  return matchesToShow.map(element => <Round key={element.id} cards={element.value} />);
};

Game.propTypes = { numberOfGames: propTypes.number.isRequired };

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

export default Game;
