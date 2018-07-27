import React from 'react';
import propTypes from 'prop-types';
import { generateUniqueKeysForItems } from '../../Helper';
import PlayingCard, { getCardCourt, getCardValue } from '../Playing-Card/Playing-Card';

const Hand = ({ cards }) => {
  let cardsArray = cards.split(' ');
  cardsArray = generateUniqueKeysForItems(cardsArray);
  return cardsArray.map(card => <PlayingCard key={card.id} cardSymbol={card.value} />);
};

Hand.propTypes = { cards: propTypes.string.isRequired };

export const calculateHandValue = cardsArray => {
  const cardsFrequency = calculateCardsFrequency(cardsArray);
  const cardsValues = [];
  let mostFrequentOccurance = 0;

  const cardFrequenceDesc = new Map([...cardsFrequency.entries()].sort((a, b) => {
    const aCardCourt = a[0];
    const aFrequency = a[1];
    const bCardCourt = b[0];
    const bFrequency = b[1];

    if (aFrequency < bFrequency) {
      return 1;
    }
    if (aFrequency === bFrequency && getCardValue(aCardCourt) < getCardValue(bCardCourt)) {
      return 1;
    }
    return -1;
  }));

  cardFrequenceDesc.forEach((value, key) => {
    cardsValues.push(getCardValue(key));
    mostFrequentOccurance = Math.max(mostFrequentOccurance, value);
  });

  return [mostFrequentOccurance, cardsValues];
};

export const calculateCardsFrequency = cardsArray => {
  const cardFrequency = new Map();
  cardsArray.forEach(card => {
    const court = String(getCardCourt(card));
    if (cardFrequency.get(court) != null) {
      cardFrequency.set(court, cardFrequency.get(court) + 1);
    } else {
      cardFrequency.set(court, 1);
    }
  });
  return cardFrequency;
};

export default Hand;
