import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Hand from './Hand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hand cards="5H 5C 6S 7S KD" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders right cards', () => {
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
