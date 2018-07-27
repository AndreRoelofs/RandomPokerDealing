import React from 'react';
import ReactDOM from 'react-dom';
import Hand from './Hand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hand cards="5H 5C 6S 7S KD" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders right cards', () => {
//   const wrapper = mount((
//     <div>
//       <div data-foo="foo" data-bar="bar">
// Hello
//       </div>
//     </div>
//   ));
// });
