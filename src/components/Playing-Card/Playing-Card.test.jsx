import React from 'react';
import { shallow } from 'enzyme';
import PlayingCard, { convertCardSymbolToUrl, getCardCourt, getCardSuite, getCardValue } from './Playing-Card';

it('renders without crashing', () => {
  shallow(<PlayingCard cardSymbol="KD" />);
});

it('Card symbol returns the right url', () => {
  const url = convertCardSymbolToUrl('6C');
  expect(url).toEqual('/cards/6_of_clubs.svg');
});

it('Card symbol returns the right court', () => {
  const url = getCardCourt('KS');
  expect(url).toEqual('king');
});

it('Card symbol returns the right suite', () => {
  const url = getCardSuite('QD');
  expect(url).toEqual('diamonds');
});

it('returns correct card value', () => {
  const value = getCardValue('queen');
  expect(value).toEqual(12);
});
