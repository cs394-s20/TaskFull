import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Account from './pages/Account'
import Login from './pages/Login'

//Firebase
import firebase from './shared/firebase.js';
import 'firebase/database';

// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Manrope\", sans-serif"
  }
});

//Authoerization config

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
   firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('user', null)
    } 
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={() => <Login user={user}/>}></Route>
            <Route path="/home" exact component={() => <Home user={user}/>}></Route>
            <Route path="/account" exact component={() => <Account user={user}/>}></Route>
            <Route path="/" render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
