import React from 'react';
// import propTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';


const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

// Header.propTypes = { name: propTypes.string.isRequired };


export default Header;
