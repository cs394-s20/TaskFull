import React, { useState, useEffect,useContext } from 'react'

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
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import citylist from '../cities.json'

// Select
import Select from 'react-select';

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

import {TasksContext} from './TasksContext';
import TaskCartCard from '../components/TaskCartCard';

const options = [
  { value: 'physical', label: 'Physical' },
  { value: 'car', label: 'Car' },
  { value: 'pets', label: 'Pets' }
];

const TasksFeed = ({ user }) => {
  const [isLoading, setisLoading] = useState(true)
  const [tasks, setTasks] = useContext(TasksContext);
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState({});
  const [states, setStates] = useState('');
  const [fullname, setFullName] = useState('');
  const [curCity, setCurCity] = useState('');
  const [city, setCity] = useState('');

  let list = [];

  const handleDropdownChange = (e) => {
    let newState = Object.assign({}, filter);
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

  //filter the states(location) of each task
  const handleStatesChange = (e) => {
    setStates(e.value);
    setFullName(e.label)

    citylist.map(each => {
      if(each.state == e.label){
        list.push(each);
      }
    })
    setCurCity(list);
  }

  //filter the city(location) of each task
  const handleCityChange = (e) => {
    setCity(e.label);
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
    BUTTON: {
      backgroundColor: '#3f51b5',
      color:'white',
    }
  });

  const buttonStyle = makeStyles({
    root: {minWidth: 275,
      minHeight: 220,
      background: '#ffecb3',
      marginTop: 5,
      marginBottom: 5,
      overflow: 'visible'
    },
  });

  


  useEffect(() => {
    const db = firebase.database().ref().child('/tasks');

    const getFeed = snap => {
      if (snap.val()) {
        setTasks(Object.values(snap.val()));
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
    let stateNameList = []
    let loadingSkeleton = []
    const currDate = Date.now();
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
    
    if (tasks.filter(t => t.status === 'unstarted').length === 0) {
      return (
        <div> 
          <p>No Posted Tasks :(</p> 
        </div>
      )
    }
    return (
        <div>
        { 
        
          tasks.filter(t => (t.status === 'unstarted') && (t.milliseconds > currDate)).reverse().map((task, index) => {
            // console.log(task.requirements)
          // console.log(filter)
          // console.log(filter.requirements)
          
          let stateName = task.address.split(', ')[2];
          let cityName = task.address.split(', ')[1];

          if(states.length == 0 || states == "ALL"){
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
            
          else if(stateName != states){
            return;
          }

          else {

            if(city.length == 0 || city == "ALL"){
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

            else if(cityName != city){
              return;
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
            
          }

        })
      } 
      </div>
    )
  }
  
  const classes = useStyles();


  return (
    
    <Grid container spacing={2}>
      <Grid style={{ padding: "1em" }} item xs={3} >

        <Button
          className = {classes.BUTTON}
          variant="contained"
          size="large"
          onClick={() => setFormOpen(true)}
          startIcon={<AddIcon />}
          style={{backgroundColor: '#3f51b5', color:'white'}}
        >
          Add New Task
        </Button>
        <div style={{ paddingTop: '0.5em'}}>
          <FilterCard
            handleDropdownChange={handleDropdownChange}
            handleStatesChange = {handleStatesChange}
            handleCityChange = {handleCityChange}
            curCity = {curCity}
          />
        </div>
        
        {/* <CompletedTasks></CompletedTasks> */}
      </Grid>
      <Grid style={{ minWidth: "550"}} item xs={6} >
        <h3 style={{marginBottom: '2.9%', marginTop:'1em'}}>Task Feed</h3>
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
      <TaskCart user={user}></TaskCart>
    </Grid>
  )
}

export default TasksFeed;