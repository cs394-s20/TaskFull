import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Poppins\", sans-serif"
  }
});

const exampleTasks = [
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    title: 'Grocery Store Run',
    author: 'Tracy Chapman',
    description: 'I need help getting to the grocery store and carrying my bags.',
    location: '2110 CS Drive, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Thu, Apr 9, 2020 6:30 PM',
    expires: '7 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-4250-8dcf-dc8c4aefc000',
    title: 'Dog Walking',
    author: 'Patrick Johnson',
    description: 'I need someone to walk my dogs while my wife is sick.',
    location: '815 Green St, Evanston, IL 60201',
    requirements: ['pets'],
    time: 'Fri, Apr 17, 2020 2:00 PM',
    expires: '9 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    title: 'Need help moving my couch',
    author: 'Drake Bell',
    description: 'I\'m looking for someone to help me carry my couch out of my house. I can provide a facemask!',
    location: '565 Greenwood St, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Wed, Aug 9, 2020 6:30 PM',
    expires: '4 mo',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    title: 'Fixing a broken bike lock',
    author: 'Todd Meyers',
    description: 'My bike lock seems to be broken and I cannot figure out how to fix it. Tried W-40.',
    location: '42 Blueberry Ln, Evanston, IL 60201',
    requirements: ['physical'],
    time: 'Fri, Apr 10, 2020 5:00 PM',
    expires: '2 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    title: 'Garden maintenance',
    author: 'Ping',
    description: 'I don\'t know anything about gardening but want to get started!',
    location: '832 Emerson St, IL 60201',
    requirements: ['physical'],
    time: 'Thu, Apr 9, 2020 11:30 AM',
    expires: '3 days',
    status: 'in progress'
  },
]

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

const Header = () => {
  return (
      <AppBar className={'header'}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={'menuButton'} color="inherit" aria-label="menu">
          
          </IconButton>
          <Typography variant="h6" color="inherit">
            TaskFull
          </Typography>
        </Toolbar>
      </AppBar>

  );
}

// This will be updated to have more than just a title!
const TaskCard = (props) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  
  const openCardDetails = task => {
    setDetailsOpen(true);
  }
  
  return (
    <Card className={'task-card'}>
      <CardActionArea onClick={() => openCardDetails(props.task)}>
        <CardContent>
          <Typography gutterBottom variant="h4" fontWeight={700}>
            {props.task.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.task.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.task.time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={THEME}>
        <NavBar></NavBar>
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          {exampleTasks.map((task, index) => (
              <TaskCard task={task} key={index}/>
          ))}
          </Grid>
        </Grid>
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
