import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import GameRoom, { processGamesFile } from './Game-Room';
import { } from '../Game/Game';

const gamesFile = '8C TS KC 9H 4S 7D 2S 5D 3S AC\n5C AD 5D AC 9C 7C 5H 8D TD KS\n3H 7H 6S KC JS QH TD JC 2D 8S\nTH 8H 5C QS TC 9H 4D JC KS JS\n7C 5H KC QH JD AS KH 4C AD 4S';


it('renders without crashing', () => {
  shallow(<GameRoom />);
});

it('correctly processes file with games', () => {
  const games = processGamesFile(gamesFile);
  expect(games.length).toEqual(5);
});

it('correctly processes file with games and correctly determines the winner', () => {
  const games = processGamesFile(gamesFile);

  expect(games.length).toEqual(5);
});
