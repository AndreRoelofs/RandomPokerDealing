// import 'jsdom-global/register';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Hand, { calculateHandValue, calculateCardsFrequency, hasRoyalFlush } from './Hand';
import { sortArray } from '../../Helper';

it('renders without crashing', () => {
  shallow(<Hand cards="5H 5C 6S 7S KD" />);
});

it('renders the right cards', () => {
  const cards = '5D 8C 9S JS AC';

  const wrapper = mount((
    <Hand cards={cards} />
  ));

  expect(wrapper.contains(<img alt="playing-card" className="playing-card" src="/cards/5_of_diamonds.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" className="playing-card" src="/cards/8_of_clubs.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" className="playing-card" src="/cards/9_of_spades.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" className="playing-card" src="/cards/jack_of_spades.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" className="playing-card" src="/cards/ace_of_clubs.svg" />)).toEqual(true);
});

it('correctly calculates the frequency of unique cards', () => {
  const cards = 'TH 6D 9H QD JH';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([1, 1, 1, 1, 1]);
});

it('correctly calculates the frequency of two repeating cards', () => {
  const cards = '9H 4D JC KS JS';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([2, 1, 1, 1]);
});

it('correctly calculates the frequency of multiple repeating cards', () => {
  const cards = '7C 7S KC KS JC';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([2, 2, 1]);
});

it('correctly calculates the frequency of a flush', () => {
  const cards = 'TH 6H 9H QH JH';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([5]);
});

it('correctly calculates the frequency of a straight', () => {
  const cards = 'TD JH QS KH AH';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([4]);
});

it('correctly calculates the frequency of a straight flush', () => {
  const cards = '9D TD JD QD KD';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([7]);
});


it('correctly calculates the value of hand', () => {
  const cards = '7H 7D KH KD 9S';
  const cardsArray = cards.split(' ');

  const totalValue = calculateHandValue(cardsArray);

  expect(totalValue).toEqual([[2, 2, 1], [13, 7, 9]]);
});


it('finds no royal flush', () => {
  const cards = '7H 7D KH KD 9S';
  const cardsArray = cards.split(' ');

  expect(hasRoyalFlush(cardsArray)).toEqual(false);
});

it('finds royal flush', () => {
  const cards = 'KD AD QD TD JD';
  const cardsArray = cards.split(' ');

  expect(hasRoyalFlush(cardsArray)).toEqual(true);
});

const getFrequencyArray = cards => {
  const cardsArray = cards.split(' ');

  const cardFrequency = Array.from(calculateCardsFrequency(cardsArray).values());
  const cardFrequenceArray = Object.keys(cardFrequency).map(key => cardFrequency[key]);

  return sortArray(cardFrequenceArray, 'DESC');
};
