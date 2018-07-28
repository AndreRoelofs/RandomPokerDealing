import React from 'react';
import { shallow } from 'enzyme';
import Game, { generateMatches, generateRound } from './Game';

it('renders without crashing', () => {
  shallow(<Game numberOfGames={10} />);
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
