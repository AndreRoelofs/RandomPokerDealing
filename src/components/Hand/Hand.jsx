import React from 'react';
import propTypes from 'prop-types';
import keygen from 'react-key-index';
import { isNumeric, generateUniqueKeysForItems } from '../../Helper';
import PlayingCard from '../Playing-Card/Playing-Card';

const Hand = ({ cards }) => {
  let cardsArray = cards.split(' ');
  cardsArray = generateUniqueKeysForItems(cardsArray);
  return cardsArray.map(card => <PlayingCard key={card.id} cardSymbol={card.value} />);
};

Hand.propTypes = { cards: propTypes.string.isRequired };

export default Hand;
