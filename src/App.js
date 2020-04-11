import React, { useState, useEffect } from 'react';
import './App.css';

// Custom
import TasksFeed from './components/TasksFeed';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


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
