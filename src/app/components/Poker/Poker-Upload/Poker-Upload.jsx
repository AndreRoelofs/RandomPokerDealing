import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import styles from './Poker-Upload.css.js'; // eslint-disable-line

function handleFileUpload({ files }) {
  const file = files[0];
  this.props.actions.uploadRequest({
    file,
    name: 'test',
  });
}

const PokerUpload = function PokerUpload(props) {
  const { classes } = props;
  return (
    <input type="file" onChange={handleFileUpload} />
  );
};

PokerUpload.propTypes = { classes: propTypes.shape({}).isRequired };


export default withStyles(styles)(PokerUpload);
