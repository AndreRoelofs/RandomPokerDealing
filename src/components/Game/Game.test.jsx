import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

it('renders without crashing', () => {
  const matches = ['5H 5C 6S 7S KD 2C 3S 8S 8D TD'];
  shallow(<Game matches={matches} />);
});
