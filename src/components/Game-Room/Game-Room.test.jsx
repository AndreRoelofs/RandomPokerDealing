import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import GameRoom, { generateMatches, generateRound } from './Game-Room';
import { } from '../Game/Game';

const mockStore = configureStore();


it('renders without crashing', () => {
  shallow(<GameRoom store={mockStore({ runtime: {} })} />);
});

it('succesfully generates 10 matches', () => {
  const numberOfGames = 10;
  const generatedMatches = generateMatches(numberOfGames);
  expect(generatedMatches.length).toEqual(10);
});

it('doesn\'t generate a round with a trailing space', () => {
  const round = generateRound();
  expect(round).not.toEqual(' ');
});
