import React from 'react';
import propTypes from 'prop-types';
import { generateUniqueKeysForItems } from '../../Helper';
import PlayingCard, { getCardCourt, getCardValue, getCardSuite } from '../Playing-Card/Playing-Card';

const Hand = ({ cards }) => {
  let cardsArray = cards.split(' ');
  cardsArray = generateUniqueKeysForItems(cardsArray);
  return cardsArray.map(card => <PlayingCard key={card.id} cardSymbol={card.value} />);
};

Hand.propTypes = { cards: propTypes.string.isRequired };

export const calculateHandValue = cardsArray => {
  let cardsFrequency = calculateCardsFrequency(cardsArray);

  cardsFrequency = sortFrequencyDesc(cardsFrequency);
  const cardsValues = calculateCardsValues(cardsFrequency);

  return [Array.from(cardsFrequency.values()), cardsValues];
};

export const calculateCardsValues = cardsFrequency => {
  const cardsValues = [];

  cardsFrequency.forEach((value, key) => {
    cardsValues.push(getCardValue(key));
  });

  return cardsValues;
};

export const calculateCardsFrequency = cardsArray => {
  const cardFrequency = new Map();
  if (hasStraightFlush(cardsArray)) {
    cardFrequency.set('ace', 8);
    return cardFrequency;
  }
  if (hasFlush(cardsArray)) {
    cardFrequency.set('ace', 5);
    return cardFrequency;
  }
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

export const hasFlush = cardsArray => {
  for (let i = 1; i < cardsArray.length; i += 1) {
    const cardSuit = getCardSuite(cardsArray[i]);
    const previousCardSuit = getCardSuite(cardsArray[i - 1]);
    if (cardSuit !== previousCardSuit) {
      return false;
    }
  }
  return true;
};

export const hasStraightFlush = cardsArray => {
  for (let i = 1; i < cardsArray.length; i += 1) {
    const card = cardsArray[i];
    const previousCard = cardsArray[i - 1];
    const cardCourt = getCardCourt(card);
    const previousCardCourt = getCardCourt(previousCard);

    if (getCardSuite(card) !== getCardSuite(previousCard)) {
      return false;
    }

    if (getCardValue(previousCardCourt) + 1 !== getCardValue(cardCourt)) {
      return false;
    }
  }
  return true;
};

export const sortFrequencyDesc = cardsFrequency =>
  new Map([...cardsFrequency.entries()].sort((a, b) => {
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

export default Hand;
