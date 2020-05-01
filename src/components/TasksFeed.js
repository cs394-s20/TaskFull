import React, { useState, useEffect } from 'react'

import '../App.css';

// Other components 
import TaskCard from './TaskCard';
import TaskCart from './TaskCart';
import CompletedTasks from './CompletedTasks';
import FilterCard from './FilterCard'

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';
import Newtask from '../components/Newtask'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

// Select
import Select from 'react-select';

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';


const options = [
  { value: 'physical', label: 'Physical' },
  { value: 'car', label: 'Car' },
  { value: 'pets', label: 'Pets' }
];

const TasksFeed = ({ user }) => {
  const [isLoading, setisLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  // const [query, setQuery] = useState({})
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState({});

  const handleDropdownChange = (e) => {
    let newState = Object.assign({}, filter);
    console.log(filter);
    const requirementsArray = []
    if (!e){
      setFilter({})
      return;
    }
    e.map((req, i) => requirementsArray.push([i, req.value]))
    const entries = new Map(requirementsArray); 
    newState.requirements = Object.fromEntries(entries)
    setFilter(newState);
    //console.log(filter);
}

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
        console.log(filter)
        setFilter(Object.values(filter))
        setisLoading(false)
      }
    }
    db.on('value', getFeed, error => alert(error));
    return () => { db.off('value', getFeed); };
  }, []);

  const handleAccept = id => {
    const newTasks = [...tasks];
    newTasks.find(t => t.id === id).status = 'in-progress';
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
          
          {tasks.filter(t => t.status === 'unstarted').map((task, index) => {
            console.log(task.requirements)
            console.log(filter)
            console.log(filter.requirements)
            if (filter.requirements){
              console.log(Object.values(filter.requirements))
              if (Object.keys(filter).length !== 0){
                if(Object.values(task.requirements).some(r=> Object.values(filter.requirements).includes(r))){
                  console.log('hi');
                  return (
                    <TaskCard 
                    key={task.id}
                    task={task} 
                    index={index}
                    class={task.status}
                    handleAccept={handleAccept}
                    user={user}
                    />
                  )
                }
              }
              
            }
            else{
              return (
                <TaskCard 
                key={task.id}
                task={task} 
                index={index}
                class={task.status}
                handleAccept={handleAccept}
                user={user}
                />
              )
            }
         
          })}
        </div>
      )
  }
  
  const classes = useStyles();

  return (
    
    <Grid container spacing={2}>
      <Grid style={{ padding: "1em" }} item xs={3} >
       
        <div>
          <FilterCard
            handleDropdownChange={handleDropdownChange}
          />
        </div>
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
          <Newtask handleclose={handleClose} user={user}></Newtask>
        </Dialog>
        <Feed></Feed>
      </Grid>
    </Grid>
  )
}

export default TasksFeed;