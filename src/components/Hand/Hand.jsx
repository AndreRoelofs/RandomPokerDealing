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
  const cardsCombination = getSpecialCardCombinations(cardsArray);
  if (cardsCombination !== 'NONE') {
    return new Map().set('NONE', getSpecialCombinationValue(cardsCombination));
  }
  const cardFrequency = new Map();
  cardsArray.forEach(card => {
    const court = String(getCardCourt(card));
    if (cardFrequency.get(court) != null) {
      cardFrequency.set(court, cardFrequency.get(court) + 1);
    } else {
      cardFrequency.set(court, 1);
    }
  });
  if (Array.from(cardFrequency.values()).indexOf(3) !== -1
  && Array.from(cardFrequency.values()).indexOf(2) !== -1) {
    return new Map().set('NONE', 6);
  }
  return cardFrequency;
};


export const getSpecialCardCombinations = cardsArray => {
  let hasFlush = true;
  let hasStraight = true;

  for (let i = 1; i < cardsArray.length; i += 1) {
    const card = cardsArray[i];
    const previousCard = cardsArray[i - 1];

    if (!areSuitsEqual(card, previousCard)) {
      hasFlush = false;
    }

    if (!areCardValuesIncremental(previousCard, card)) {
      hasStraight = false;
    }
  }

  if (hasFlush && hasRoyalFlush(cardsArray)) return 'ROYALFLUSH';
  if (hasFlush && hasStraight) return 'STRAIGHTFLUSH';
  if (hasFlush) return 'FLUSH';
  if (hasStraight) return 'STRAIGHT';
  return 'NONE';
};

const getSpecialCombinationValue = combination => {
  switch (combination) {
    case 'ROYALFLUSH':
      return 8;
    case 'STRAIGHTFLUSH':
      return 7;
    case 'FLUSH':
      return 5;
    case 'STRAIGHT':
      return 4;
    default:
      throw Error(`Value of ${combination} is not defined`);
  }
};


export const hasRoyalFlush = cardsArray => {
  const cardCourtsRequired = ['10', 'jack', 'queen', 'king', 'ace'];
  let qualifies = true;
  cardsArray.forEach(card => {
    const court = getCardCourt(card);
    if (cardCourtsRequired.indexOf(court) === -1) {
      qualifies = false;
    }
  });
  return qualifies;
};

const areSuitsEqual = (card1, card2) => getCardSuite(card1) === getCardSuite(card2);
const areCardValuesIncremental = (card1, card2) => {
  const card1Court = getCardCourt(card1);
  const card2Court = getCardCourt(card2);
  return getCardValue(card1Court) + 1 === getCardValue(card2Court);
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
