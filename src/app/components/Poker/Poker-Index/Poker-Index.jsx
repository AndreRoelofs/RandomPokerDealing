import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import styles from './Poker-Index.css.js'; // eslint-disable-line
import PokerUpload from '../Poker-Upload/Poker-Upload';
import PlayingCard from '../../Card/Playing-Card';

const PokerIndex = function PokerIndex(props) {
  const { classes } = props;
  return (
    <div>
      <PokerUpload />
      <PlayingCard />
    </div>
  );
};

PokerIndex.propTypes = { classes: propTypes.shape({}).isRequired };


export default withStyles(styles)(PokerIndex);
