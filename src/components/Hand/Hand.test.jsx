import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Hand, { calculateHandValue, calculateCardsFrequency } from './Hand';
import { sortArray } from '../../Helper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hand cards="5H 5C 6S 7S KD" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the right cards', () => {
  const cards = '5D 8C 9S JS AC';

  const wrapper = mount((
    <Hand cards={cards} />
  ));

  expect(wrapper.contains(<img alt="playing-card" src="/cards/5_of_diamonds.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" src="/cards/8_of_clubs.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" src="/cards/9_of_spades.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" src="/cards/jack_of_spades.svg" />)).toEqual(true);
  expect(wrapper.contains(<img alt="playing-card" src="/cards/ace_of_clubs.svg" />)).toEqual(true);
});

it('correctly sorts the frequency of unique cards', () => {
  const cards = 'TH 6H 9H QH JH';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([1, 1, 1, 1, 1]);
});

it('correctly sorts the frequency of two repeating cards', () => {
  const cards = '9H 4D JC KS JS';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([2, 1, 1, 1]);
});

it('correctly sorts the frequency of multiple repeating cards', () => {
  const cards = '7C 7S KC KS JC';
  const sortedCardFrequencyArray = getFrequencyArray(cards);
  expect(sortedCardFrequencyArray).toEqual([2, 2, 1]);
});

it('correctly predicts the winner', () => {
  const cards = '7H 7D KH KD 9S';
  const cardsArray = cards.split(' ');

  const totalValue = calculateHandValue(cardsArray);

  expect(totalValue).toEqual([2, [13, 7, 9]]);
});

const getFrequencyArray = cards => {
  const cardsArray = cards.split(' ');

  const cardFrequency = Array.from(calculateCardsFrequency(cardsArray).values());
  const cardFrequenceArray = Object.keys(cardFrequency).map(key => cardFrequency[key]);

  return sortArray(cardFrequenceArray, 'DESC');
};
