import React, { useState, useEffect } from 'react'

import '../App.css';
import TaskCard from './TaskCard';
import Filter from './Filter';
import TaskCart from './TaskCart';
import CompletedTasks from './CompletedTasks';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

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
    id: '11bf5b37-e0b8-4250-8dcf-dc8c4aefc001',
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
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc002',
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
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc003',
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
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc004',
    title: 'Garden maintenance',
    author: 'Ping',
    description: 'I don\'t know anything about gardening but want to get started!',
    location: '832 Emerson St, IL 60201',
    requirements: ['physical'],
    time: 'Thu, Apr 9, 2020 11:30 AM',
    expires: '3 days',
    status: 'in-progress'
  }]

const TasksFeed = () => {
  const [isLoading, setisLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState({})

  const db = firebase.database().ref().child('/tasks');

  // useEffect(() => {
  //   // In the real app we will fetch from our API

  useEffect(() => {
    const getFeed = snap => {
      if (snap.val()) {
        console.log(snap.val());
        console.log(Object.values(snap.val()));
        setTasks(Object.values(snap.val()));
        setisLoading(false)
      }
    }
    db.on('value', getFeed, error => alert(error));
    return () => { db.off('value', getFeed); };
  }, []);

  // useEffect(() => {
  //   // In the real app we will fetch from our API
  //   db.on('value', snap => console.log(snap))
    
  //   setTasks(exampleTasks)
  // }, [])

  const handleQuery = (query) => {
    setQuery(query)
  }

  const handleAccept = id => {
    const newTasks = [...tasks];
    newTasks.find(t => t.id === id).status = 'in-progress';
    setTasks(newTasks);
  }

  const Feed = () => {

    const theme = createMuiTheme({
      palette: {
        primary: {
          // Purple and green play nicely together.
          main: purple[500],
        },
        secondary: {
          // This is green.A700 as hex.
          main: '#11cb5f',
        },
      },
    });



    let loadingSkeleton = []
    for (let i = 0; i < 10; i++) {
      loadingSkeleton.push(
        <div key={i} className="skeleton-card">
          <Skeleton animation="wave" variant="text" />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton animation="wave" variant="rect" height={118} />
        </div>
      )
    }

    if (isLoading) {
      return (
        <div>
          <LinearProgress />
          {loadingSkeleton}
        </div>
      )
    }
    return (
        <div>
          {tasks.filter(t => t.status === 'unstarted').map((task, index) => (
          <TaskCard 
                key={task.id}
                task={task} 
                index={index}
                class={task.status}
                handleAccept={handleAccept}
                />
        ))}
        </div>
      )
  }
  
  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={2}>
      <Grid style={{ padding: "1em" }} item xs={3} >
        <Filter onChange={handleQuery}></Filter>
        <TaskCart></TaskCart>
        <CompletedTasks></CompletedTasks>
      </Grid>
      <Grid style={{ padding: "1em" }} item xs={6} >
        <Feed></Feed>
        
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}

export default TasksFeed;