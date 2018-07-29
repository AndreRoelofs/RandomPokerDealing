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
  const individualCardValues = calculateIndividualCardValues(cardsFrequency);
  let handValue = 9;
  const cardsCombinations = [
    hasRoyalFlush,
    hasStraightFlush,
    hasFourOfAKind,
    hasFullHouse,
    hasFlush,
    hasStraight,
    hasThreeOfAKind,
    hasTwoPairs,
    hasTwoOfAKind,
  ];

  for (let i = 0; i < cardsCombinations.length; i += 1) {
    const isCombinationValid = cardsCombinations[i];
    if (isCombinationValid(cardsArray)) {
      break;
    }
    handValue -= 1;
  }

  return [handValue, individualCardValues];
};

export const calculateIndividualCardValues = cardsFrequency =>
  Array.from(cardsFrequency.keys()).map(key => getCardValue(key));


export const hasRoyalFlush = cardsArray => {
  const cardCourtsRequired = ['10', 'jack', 'queen', 'king', 'ace'];
  let qualifies = true;

  if (!hasSameSuits(cardsArray)) {
    return false;
  }
  cardsArray.forEach(card => {
    const court = getCardCourt(card);
    if (cardCourtsRequired.indexOf(court) === -1) {
      qualifies = false;
    }
  });

  return qualifies;
};

export const hasStraightFlush = cardsArray =>
  hasSameSuits(cardsArray) && hasIncrementalCourts(cardsArray);

export const hasStraight = cardsArray => hasIncrementalCourts(cardsArray);
export const hasFlush = cardsArray => hasSameSuits(cardsArray);

export const hasFourOfAKind = cardsArray => hasXOfAKind(cardsArray, 4);
export const hasThreeOfAKind = cardsArray => hasXOfAKind(cardsArray, 3);
export const hasTwoOfAKind = cardsArray => hasXOfAKind(cardsArray, 2);

const hasXOfAKind = (cardsArray, x) => {
  const cardsFrequency = calculateCardsFrequency(cardsArray);
  const frequencyArray = Array.from(cardsFrequency.values());
  return frequencyArray.indexOf(x) !== -1;
};

export const hasTwoPairs = cardsArray => {
  const cardsFrequency = calculateCardsFrequency(cardsArray);
  const frequencyArray = Array.from(cardsFrequency.values());
  let numberOfPairs = 0;
  frequencyArray.forEach(frequencyNumber => {
    if (frequencyNumber === 2) {
      numberOfPairs += 1;
    }
  });
  return numberOfPairs === 2;
};

export const hasFullHouse = cardsArray => {
  const cardsFrequency = calculateCardsFrequency(cardsArray);
  const frequencyArray = Array.from(cardsFrequency.values());
  return frequencyArray.indexOf(3) !== -1 && frequencyArray.indexOf(2) !== -1;
};


export const hasSameSuits = cardsArray => {
  const hasEqualSuits = (card1, card2) => getCardSuite(card1) === getCardSuite(card2);

  for (let i = 1; i < cardsArray.length; i += 1) {
    const card = cardsArray[i];
    const previousCard = cardsArray[i - 1];

    if (!hasEqualSuits(card, previousCard)) {
      return false;
    }
  }
  return true;
};

export const hasIncrementalCourts = cardsArray => {
  const hasIncrementalCardValues = (card1, card2) =>
    getCardValue(getCardCourt(card1)) + 1 === getCardValue(getCardCourt(card2));

  const sortedCards = sortByCardValueAsc(cardsArray);
  for (let i = 1; i < sortedCards.length; i += 1) {
    const card = sortedCards[i];
    const previousCard = sortedCards[i - 1];
    if (!hasIncrementalCardValues(previousCard, card)) {
      return false;
    }
  }
  return true;
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

export const sortByCardValueAsc = cardsArray => {
  cardsArray.sort((card1, card2) => {
    const court1 = getCardCourt(card1);
    const court2 = getCardCourt(card2);
    if (getCardValue(court1) > getCardValue(court2)) {
      return 1;
    }
    if (getCardValue(court1) < getCardValue(court2)) {
      return -1;
    }
    return 0;
  });
  return cardsArray;
};


export default Hand;
