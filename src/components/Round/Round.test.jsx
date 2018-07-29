import React from 'react';
import { shallow } from 'enzyme';
import Round, { determineWinner, splitCards } from './Round';

it('renders without crashing', () => {
  shallow(<Round cards="2H 2D 4C 4D 4S 3C 3D 3S 9S 9D" />);
});

it('correctly determines the winner with a higher pair', () => {
  const player1Cards = '5H 5C 6S 7S KD';
  const player2Cards = '2C 3S 8S 8D TD';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(2);
});


it('correctly determines the winner with the highest card', () => {
  const player1Cards = '5D 8C 9S JS AC';
  const player2Cards = '2C 5C 7D 8S QH';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly determines the winner with flush of diamond', () => {
  const player1Cards = '2D 9C AS AH AC';
  const player2Cards = '3D 6D 7D TD QD';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(2);
});

it('correctly determines the winner with equal combination pair and the highest card', () => {
  const player1Cards = '4D 6S 9H QH QC';
  const player2Cards = '3D 6D 7H QD QS';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly determines the winner with full house and higher pair', () => {
  const player1Cards = '2H 2D 4C 4D 4S';
  const player2Cards = '3C 3D 3S 9S 9D';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats a high card with a pair', () => {
  const player1Cards = '2H 2H 3D 4D 5S';
  const player2Cards = '4S 5D 6D 7D AS';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats a pair with two pairs', () => {
  const player1Cards = '2H 2H 3D 3D 5S';
  const player2Cards = '4S 4D 6D 7D AS';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats two pairs with three of a kind', () => {
  const player1Cards = '4S 4D 4D 7D AS';
  const player2Cards = '2H 2H 3D 3D 5S';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats three of a kind with straight', () => {
  const player1Cards = '2S 3D 4D 5D 6S';
  const player2Cards = '4S 4D 4D 7D AS';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats straight with flush', () => {
  const player1Cards = '4D 3D 4D 5D 6D';
  const player2Cards = '2S 3D 4D 5D 6S';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats full house with four of a kind', () => {
  const player1Cards = '4D 4H 4D 4S 6D';
  const player2Cards = '3S 3D 3D 2D 2S';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats four of a kind with straight flush', () => {
  const player1Cards = '2D 3D 4D 5D 6D';
  const player2Cards = '4D 4H 4D 4S 6D';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly beats straight flush with royal flush', () => {
  const player1Cards = 'TD JD QD KD AD';
  const player2Cards = '2D 3D 4D 5D 6D';
  const winner = determineWinner(player1Cards, player2Cards);
  expect(winner).toEqual(1);
});

it('correctly determines the winner with full house and higher pair', () => {
  const cards = '2H 2D 4C 4D 4S 3C 3D 3S 9S 9D';

  const playerHands = splitCards(cards);

  expect(playerHands).toEqual(['2H 2D 4C 4D 4S', '3C 3D 3S 9S 9D']);
});
