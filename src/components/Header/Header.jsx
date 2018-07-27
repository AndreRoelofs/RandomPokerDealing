import React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';

const Header = () => (
  <div className="root">
    <AppBar position="static">
      <Toolbar>
        <IconButton className="menuButton" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className="flex">
              Random Poker Dealer
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Header;
