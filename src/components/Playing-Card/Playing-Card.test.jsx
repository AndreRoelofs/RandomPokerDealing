import React from 'react';
import ReactDOM from 'react-dom';
import PlayingCard, { convertCardSymbolToUrl, getCardCourt, getCardSuite } from './Playing-Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayingCard cardSymbol="KD" />, div);
  ReactDOM.unmountComponentAtNode(div);
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
