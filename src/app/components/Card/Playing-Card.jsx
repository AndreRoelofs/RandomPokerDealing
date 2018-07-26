import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import defaultImage from './cards/2_of_clubs.svg';
import styles from './Playing-Card.css.js'; // eslint-disable-line

const cardTypeMap = {
  D: 'diamonds',
  S: 'spades',
  H: 'hearts',
  C: 'clubs',
};

const PlayingCard = ({ classes, cardType }) => {
  const req = require.context('./cards', false, /.*\.svg$/);
  req.keys().forEach(key => {
    req(key);
    console.log(req(key));
  });
  return (
    <div>
      <img src={defaultImage} className={classes.playingCard} alt="Playing Card" />
    </div>
  );
};

PlayingCard.propTypes = { classes: propTypes.shape({}).isRequired };


export default withStyles(styles)(PlayingCard);
