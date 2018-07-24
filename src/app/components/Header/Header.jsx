import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import styles from './Header.css.js'; // eslint-disable-line

const Header = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
          Random Poker Dealer
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = { classes: propTypes.shape({}).isRequired };


export default withStyles(styles)(Header);
