// import 'jsdom-global/register';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Hand, { hasRoyalFlush, hasFourOfAKind, hasFullHouse, hasStraightFlush, hasStraight, hasThreeOfAKind, hasTwoOfAKind, hasTwoPairs, calculateHandValue } from './Hand';

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

it('correctly determines royal flush', () => {
  const cards = 'KD AD QD TD JD';
  const cardsArray = cards.split(' ');
  expect(hasRoyalFlush(cardsArray)).toEqual(true);
});

it('correctly determines straight flush', () => {
  const cards = '9D TD JD QD KD';
  const cardsArray = cards.split(' ');
  expect(hasStraightFlush(cardsArray)).toEqual(true);
});


it('correctly determines four of a kind', () => {
  const cards = 'TH TD TC TS JH';
  const cardsArray = cards.split(' ');
  expect(hasFourOfAKind(cardsArray)).toEqual(true);
});

it('correctly determines full house', () => {
  const cards = '3H 3D 3C 2S 2H';
  const cardsArray = cards.split(' ');
  expect(hasFullHouse(cardsArray)).toEqual(true);
});

it('correctly determines flush', () => {
  const cards = '3H 3D 3C 2S 2H';
  const cardsArray = cards.split(' ');
  expect(hasFullHouse(cardsArray)).toEqual(true);
});

it('correctly determines straight', () => {
  const cards = 'TD JH QS KH AH';
  const cardsArray = cards.split(' ');
  expect(hasStraight(cardsArray)).toEqual(true);
});

it('correctly determines three of a kind', () => {
  const cards = '3D 3H 3S KH AH';
  const cardsArray = cards.split(' ');
  expect(hasThreeOfAKind(cardsArray)).toEqual(true);
});


it('correctly determines two pair', () => {
  const cards = '3D 3H 2S 2H AH';
  const cardsArray = cards.split(' ');
  expect(hasTwoPairs(cardsArray)).toEqual(true);
});

it('correctly determines a pair', () => {
  const cards = '3D 3H 9S KH AH';
  const cardsArray = cards.split(' ');
  expect(hasTwoOfAKind(cardsArray)).toEqual(true);
});

it('correctly calculates hand value with a pair', () => {
  const cards = '4D 6S 9H QH QC';
  const cardsArray = cards.split(' ');
  const handValue = calculateHandValue(cardsArray);
  expect(handValue).toEqual([1, [12, 9, 6, 4]]);
});

it('correctly calculates hand value with a single card', () => {
  const cards = '5D 8C 9S JS AC';
  const cardsArray = cards.split(' ');
  const handValue = calculateHandValue(cardsArray);
  expect(handValue).toEqual([0, [14, 11, 9, 8, 5]]);
});

it('correctly calculates hand value with a royal flush', () => {
  const cards = 'TD JD QD KD AD';
  const cardsArray = cards.split(' ');
  const handValue = calculateHandValue(cardsArray);
  expect(handValue).toEqual([9, [14, 13, 12, 11, 10]]);
});
