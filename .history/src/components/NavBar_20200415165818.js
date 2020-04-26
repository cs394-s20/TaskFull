import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none'
  },
  a: {
    color: 'white',
  }
 }));

const NavBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} component={Link} to={'/'}>
            TaskFull
        </Typography>
        <IconButton color="inherit" aria-label="account" onClick={handleClick}>
          <AccountCircleIcon aria-controls="account-menu" aria-haspopup="true">
          </AccountCircleIcon>
        </IconButton>

        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to={'/account'} onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
