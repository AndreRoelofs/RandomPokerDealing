import keygen from 'react-key-index';

// eslint-disable-next-line
export const isNumeric = variable => !isNaN(variable);

export const generateUniqueKeysForItems = (array, label = 1) => keygen(array, label);

export const sortArray = (array, order = 'DESC') => {
  if (order.toUpperCase() === 'DESC') {
    return array.sort((a, b) => b - a);
  } if (order.toUpperCase() === 'ASC') {
    return array.sort((a, b) => a - b);
  }
  throw new Error(`Order can be equal to either DESC or ASC but is equal to ${order}`);
};
