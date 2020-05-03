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


  let list = [];

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
    console.log(list)
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
          tasks.filter(t => t.status === 'unstarted').map((task, index) => {
            // console.log(task.requirements)
          // console.log(filter)
          // console.log(filter.requirements)
          
          let stateName = task.address.split(', ')[2];

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

          // if (filter.requirements ) {
          //   console.log(Object.values(filter.requirements))
          //   if (Object.keys(filter).length !== 0) {
          //     if (Object.values(task.requirements).some(r => Object.values(filter.requirements).includes(r))) {
          //       console.log('hi');
          //       return (
          //         <TaskCard
          //           key={task.id}
          //           task={task}
          //           index={index}
          //           class={task.status}
          //           handleAccept={handleAccept}
          //           user={user}
          //         />
          //       )
          //     }
          //   }

          // }
          else {
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
          variant="contained"
          size="large"
          onClick={() => setFormOpen(true)}
          startIcon={<AddIcon />}
        >
          Add New Task
        </Button>
        <div>
          <FilterCard
            handleDropdownChange={handleDropdownChange}
            handleStatesChange = {handleStatesChange}
            curCity = {curCity}
          />
        </div>
        <TaskCart user={user}></TaskCart>
        {/* <CompletedTasks></CompletedTasks> */}
      </Grid>
      <Grid style={{ padding: "1em", minWidth: "550"}} item xs={6} >
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
        {/* <Tooltip className="addTask" style={{cursor:'pointer'} }title="Add New Task" onClick={() => setFormOpen(true)}><AddIcon className='fixPlus'/></Tooltip> */}
      </Grid>
    </Grid>
  )
}

export default TasksFeed;