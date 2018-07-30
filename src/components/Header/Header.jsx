import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Header.scss';

const Header = () => (
  <div className="root">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" className="flex">
              Random Poker Dealer
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
