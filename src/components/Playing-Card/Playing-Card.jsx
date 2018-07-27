import React from 'react';
import propTypes from 'prop-types';
// import './App.scss';

const cardTypeMap = {
  D: 'diamonds',
  S: 'spades',
  H: 'hearts',
  C: 'clubs',
};

export const convertCardSymbolToUrl = cardSymbol => `/cards/${cardSymbol[0]}_of_${cardTypeMap[cardSymbol[1]]}.svg`;

const PlayingCard = ({ cardSymbol }) => {
  const url = '/cards/2_of_clubs.svg';
  return <img alt="test" src={url} />;
};

PlayingCard.propTypes = { cardSymbol: propTypes.string.isRequired };

export default PlayingCard;
