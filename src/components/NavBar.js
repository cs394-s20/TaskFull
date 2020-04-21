import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

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

//Firebase
import firebase from '../shared/firebase.js';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const db = firebase.database().ref()

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {

    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#FF7F24',
    color: '#FF7F24',
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
  },
  logo: {
    height: 35,
  }
 }));

const NavBar = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user != null) {
      db.child('/users/' + user.uid).once("value") 
        .then(snapshot => {
          if (!snapshot.val()) {
            db.child('/users/' + user.uid).set({
              username: user.displayName,
              tasks: {},
              acceptedTasks: {},
              points: 10
            })
          }
          else {
            console.log("user already exists")
          }
        })
    }
  }, [user])

  return (
      <AppBar position="static" className={classes.menuButton}>
      <Toolbar >
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} component={Link} to={'/'}>
          <img src="logo_title.png" className={classes.logo} alt="TaskFull logo"></img>
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
          <MenuItem primary onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
        </Menu>

        {user ? <Button primary onClick={() => firebase.auth().signOut()} color="inherit">Logout</Button> :   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
