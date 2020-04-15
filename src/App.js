import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Account from './pages/Account'

//Firebase
import firebase from 'firebase/app';
import 'firebase/database';

// Material UI
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
    "fontFamily": "\"Manrope\", sans-serif"
  }
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/account" exact component={Account}></Route>
            <Route path="/" render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
