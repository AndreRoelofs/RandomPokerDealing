import React from 'react';
import propTypes from 'prop-types';
import { isNumeric } from '../../Helper';

const cardSuites = {
  D: 'diamonds',
  S: 'spades',
  H: 'hearts',
  C: 'clubs',
};

const cardCourts = {
  K: 'king',
  J: 'jack',
  Q: 'queen',
  A: 'ace',
};

const PlayingCard = ({ cardSymbol }) => {
  const url = convertCardSymbolToUrl(cardSymbol);
  return <img alt="playing-card" src={url} />;
};

PlayingCard.propTypes = { cardSymbol: propTypes.string.isRequired };

export const convertCardSymbolToUrl = cardSymbol => `/cards/${getCardCourt(cardSymbol)}_of_${getCardSuite(cardSymbol)}.svg`;

export const getCardSuite = cardSymbol => cardSuites[cardSymbol[1]];

export const getCardCourt = cardSymbol => {
  const courtSymbol = cardSymbol[0];
  if (isNumeric(courtSymbol)) {
    return courtSymbol;
  }
  return cardCourts[courtSymbol];
};

export default PlayingCard;
