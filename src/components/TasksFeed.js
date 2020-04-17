import React, { useState, useEffect } from 'react'

import '../App.css';
import TaskCard from './TaskCard';
import Filter from './Filter';
import TaskCart from './TaskCart';
import CompletedTasks from './CompletedTasks';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';
import Newtask from '../components/Newtask'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';


// Firebase
import firebase from 'firebase/app';
import 'firebase/database';


const TasksFeed = () => {
  const [isLoading, setisLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState({})
  const [formOpen, setFormOpen] = useState(false)

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
  
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      
    },
    pos: {
      marginBottom: 12,
    },
  });


  useEffect(() => {
    const db = firebase.database().ref().child('/tasks');

    const getFeed = snap => {
      if (snap.val()) {
        setTasks(Object.values(snap.val()));
        setisLoading(false)
      }
    }
    db.on('value', getFeed, error => alert(error));
    return () => { db.off('value', getFeed); };
  }, []);

  const handleQuery = (query, options) => {
    setQuery(query)
    handleMultiFilter(options)
  }

  const handleAccept = id => {
    const newTasks = [...tasks];
    newTasks.find(t => t.id === id).status = 'in-progress';
    setTasks(newTasks);
  }

  const handleMultiFilter = options => {
    const newTasks = [...tasks];
    console.log(options)
    newTasks.filter(t => t.reqs === options);
    console.log("Made it into mutlifilter")
    setTasks(newTasks);
  }
  
  const handleClose = () => {
    setFormOpen(false);
  }

  

  const Feed = () => {
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
  
  const classes = useStyles();

  return (
    
    <Grid container spacing={2}>
      <Grid style={{ padding: "1em" }} item xs={3} >
        <Filter onChange={handleQuery} handleMultiFilter={handleMultiFilter}></Filter>
        <TaskCart></TaskCart>
        <CompletedTasks></CompletedTasks>
      </Grid>
      <Grid style={{ padding: "1em", minWidth: "550"}} item xs={6} >
        <Card style={{ width: "550" }}>
          <CardActionArea className="add-task-card" onClick={() => setFormOpen(true)}>
          Add New Task
          </CardActionArea>
        </Card>
      <Dialog
        scroll="body"
        open={formOpen}
        fullWidth
        maxWidth={'md'}
        onClose={() => setFormOpen(false)}
        aria-labelledby="newtask-dialog-title"
        aria-describedby="newtask-dialog-description">
          <Newtask handleclose={handleClose}></Newtask>
        </Dialog>
        <Feed></Feed>
      </Grid>
    </Grid>
  )
}

export default TasksFeed;