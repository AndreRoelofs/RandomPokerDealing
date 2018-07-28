import React from 'react';
import propTypes from 'prop-types';
import Hand, { calculateHandValue } from '../Hand/Hand';
import './Round.scss';

const Round = ({ cards }) => {
  const playerHands = splitCards(cards);
  const winner = determineWinner(playerHands[0], playerHands[1]);
  return (
    <div className="round-root">
      <div className={(winner === 1) ? 'winner' : ''}>
        <Hand cards={playerHands[0]} />
      </div>
      <div className={(winner === 2) ? 'winner' : ''}>
        <Hand cards={playerHands[1]} />
      </div>
    </div>
  );
};

export const splitCards = cards => {
  const playerHands = [];
  playerHands.push(cards.substr(0, Math.ceil(cards.length / 2) - 1));
  playerHands.push(cards.substr(Math.ceil(cards.length / 2)));
  return playerHands;
};

export const determineWinner = (player1Cards, player2Cards) => {
  const p1HandValue = calculateHandValue(player1Cards.split(' '));
  const p2HandValue = calculateHandValue(player2Cards.split(' '));

  let winner = compareFirstTuple(p1HandValue, p2HandValue);

  if (winner === 0) {
    winner = compareSecondTuple(p1HandValue, p2HandValue);

    if (winner === 0) {
      throw Error('No winner could be determined');
    }
  }

  return winner;
};

export const compareFirstTuple = (p1HandValue, p2HandValue) =>
  compareTuples(p1HandValue, p2HandValue, 0);

export const compareSecondTuple = (p1HandValue, p2HandValue) =>
  compareTuples(p1HandValue, p2HandValue, 1);

const compareTuples = (p1HandValue, p2HandValue, numberOfTuple) => {
  const p1Tuple = p1HandValue[numberOfTuple];
  const p2Tuple = p2HandValue[numberOfTuple];
  let winner = 0;
  const minLength = Math.min(p1Tuple.length, p2Tuple.length);
  for (let i = 0; i < minLength; i += 1) {
    if (p1Tuple[i] > p2Tuple[i]) {
      winner = 1;
      break;
    }
    if (p1Tuple[i] < p2Tuple[i]) {
      winner = 2;
      break;
    }
  }
  return winner;
};

Round.propTypes = {
  cards: propTypes.string.isRequired,
};

export default Round;
