import React, { useState, useEffect } from 'react';
import './App.css';

//Firebase
import firebase from 'firebase/app';
import 'firebase/database';

// Custom
import TasksFeed from './components/TasksFeed';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const firebaseConfig = {
  apiKey: "AIzaSyCigoqWUWaTu0KOBgFJ63CsfxHJy9C_q-o",
  authDomain: "taskfull-b8522.firebaseapp.com",
  databaseURL: "https://taskfull-b8522.firebaseio.com",
  projectId: "taskfull-b8522",
  storageBucket: "taskfull-b8522.appspot.com",
  messagingSenderId: "422891538648",
  appId: "1:422891538648:web:7e9172beb01b51b0616fad"
};

firebase.initializeApp(firebaseConfig);

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Poppins\", sans-serif"
  }
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={THEME}>
        <NavBar></NavBar>
        <TasksFeed></TasksFeed>
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
