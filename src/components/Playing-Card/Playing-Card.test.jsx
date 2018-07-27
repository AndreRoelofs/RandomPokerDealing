import React from 'react';
import ReactDOM from 'react-dom';
import PlayingCard, { convertCardSymbolToUrl } from './Playing-Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayingCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Card type returns the right url', () => {
  const url = convertCardSymbolToUrl('6C');
  expect(url).toEqual('/cards/6_of_clubs.svg');
});
