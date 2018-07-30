import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Hand, { calculateHandValue } from '../Hand/Hand';
import './Round.scss';

const Round = ({ cards, incrementScore }) => {
  const playerHands = splitCards(cards);
  if (playerHands[0] === '') {
    return <div />;
  }
  const winner = determineWinner(playerHands[0], playerHands[1]);
  incrementScore(`player${winner}`);
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

Round.propTypes = {
  cards: propTypes.string.isRequired,
  incrementScore: propTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  incrementScore: playerName => {
    dispatch({
      type: 'INCREMENT_SCORE',
      payload: {
        name: playerName,
      },
    });
  },
});

export const splitCards = cards => {
  const playerHands = [];
  playerHands.push(cards.substr(0, Math.ceil(cards.length / 2) - 1));
  playerHands.push(cards.substr(Math.ceil(cards.length / 2)));
  return playerHands;
};

export const determineWinner = (player1Cards, player2Cards) => {
  const p1HandValue = calculateHandValue(player1Cards.split(' '));
  const p2HandValue = calculateHandValue(player2Cards.split(' '));

  let winner = compareFirstTuples(p1HandValue, p2HandValue);

  if (winner === 0) {
    winner = compareSecondTuples(p1HandValue, p2HandValue);

    if (winner === 0) {
      throw Error('No winner could be determined');
    }
  }
  return winner;
};

export const compareFirstTuples = (p1HandValue, p2HandValue) => {
  if (p1HandValue[0] === p2HandValue[0]) { return 0; }
  return (p1HandValue[0] > p2HandValue[0]) ? 1 : 2;
};


export const compareSecondTuples = (p1HandValue, p2HandValue) => {
  const p1Tuple = p1HandValue[1];
  const p2Tuple = p2HandValue[1];
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

export default connect(mapStateToProps, mapDispatchToProps)(Round);
