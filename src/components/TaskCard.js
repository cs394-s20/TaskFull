import React, { useState, useContext } from 'react';
import '../App.css';
import {TasksContext} from './TasksContext'

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NotesIcon from '@material-ui/icons/Notes';

import { makeStyles } from '@material-ui/core/styles';

import "./ItemsTable.css";

import firebase from 'firebase/app';
import 'firebase/database';

const DialogHeader = (props) => {
  return (
    <Typography className="dialog-header" fontWeight={700} variant="h4">{props.children}</Typography>
  )
}

const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [taskCart, setTaskCart] = useContext(TasksContext);
  const user = props.user

  const handleCardOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = () => {
    let myTask = props.task;
    myTask.status = 'in-progress';   
    myTask.acceptedBy = user.uid; 
    myTask.acceptedByEmail = user.email; 
    setTaskCart(curr => [...curr, myTask]); 

    const db = firebase.database().ref()
    db.child('tasks/' + myTask.id + '/status/').set('in-progress');
    db.child('tasks/' + myTask.id + '/acceptedBy/').set(user.uid);
    db.child('tasks/' + myTask.id + '/acceptedByEmail/').set(user.email);
    db.child('users/' + user.uid + '/to_do/' + myTask.id).set('in-progress');
  }
  
  const style={
    backgroundColor: 'green',
  };

  const useStyles = makeStyles({
    root: {
      // minWidth: 190,
      width:550,
      // background: '#ffecb3',
      background: '#3f51b5',
      color: 'white',
      marginTop: 5,
      marginBottom: 5,
    },
    button: {
      // background: '#ff9e80',
      background: '#3f51b5',
      color: 'white',
    }
  });

  
  const cityName = props.task.address.split(", ")[1];
  const stateName = props.task.address.split(", ")[2];


  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea onClick={() => handleCardOpen(props.task)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5" fontWeight={700}>
            {props.task.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="p">
            {props.task.description}
          </Typography>
          <div className='card-last-row'>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.task.time}
          </Typography>
          {/* <div>
          <Chip label={props.task.address} className="req-chip"></Chip>
          </div> */}
          {/* <div>{Object.values(props.task.requirements).map((req, index) => (
            <Chip label={req} key={index} className="req-chip"></Chip>
          ))}
          </div> */}
          </div>
        </CardContent>
      </CardActionArea>
      <Dialog
        open={open}
        fullWidth
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogHeader>
          {props.task.title}
        </DialogHeader>
        <DialogContent>
          <span className="field-row">
            <AccountCircle className="field-icon" />
            <Typography variant="body1" component="p" color="textSecondary" pb={3}>
              {props.task.author}
            </Typography>
          </span>
          <span className="field-row">
          <PinDropIcon className="field-icon" />
          <Typography variant="body2" component="p" color="textSecondary" pb={3}>
              {cityName}, {stateName}
          </Typography>
          </span>
          <span className="field-row">
            <ScheduleIcon className="field-icon"/>
            <Typography variant="body2" component="p" color="textSecondary" pb={3}>
              {props.task.completeBy}
            </Typography>
          </span>
          <span className="field-row">
            <NotesIcon className="field-icon" />
            <Typography gutterBottom component="p" variant="body1">
              {props.task.description}
            </Typography>
          </span>
          <div className="table">
            <div className="table-title">Items List</div>
            <div className="table-content">
              <div className="table-header">
                <div className="table-row">
                  <div className="table-data">
                    <div>Item</div>
                  </div>
                  <div className="table-data">
                    <div>Quantity</div>
                  </div>
                </div>
              </div>
              <div className="table-body">
                {props.task.items.map((item, index) => (
                  <div className="table-row" key={index}>
                    <div className="table-data">
                      <div key={index}>{item.name}</div>
                    </div>
                    <div className="table-data">
                    <div key={index}>{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="table-footer">
                <div className="table-row">
                  <div className="table-data">
                {/* <div>Total No. of Items: {values.items.length}</div> */}
                  </div>
                  
                  <div className="table-data">
                  </div>
                  
                </div>
               
              </div>
            </div>
          </div>
          {/* <div className="req-row">
            {Object.values(props.task.requirements).map((req, index) => (
                <Chip label={req} key={index} className="req-row"></Chip>
            ))}
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.button} onClick={()=>{ handleClose(); addToCart()} } autoFocus>
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskCard;