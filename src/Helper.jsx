import keygen from 'react-key-index';

// eslint-disable-next-line
export const isNumeric = variable => !isNaN(variable);

export const generateUniqueKeysForItems = (array, label = 1) => keygen(array, label);
