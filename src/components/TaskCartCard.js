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

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

const DialogHeader = (props) => {
  return (
    <Typography className="dialog-header" fontWeight={700} variant="h4">{props.children}</Typography>
  )
}

const myTasksStyles = makeStyles({
  root: {
    marginTop: 5,
    marginBottom: 5,
    width: 250,
    //height:107,
    background: '#ffecb3'
    // background: '#FFE4C4'
    // background: '#3f51b5',
    // color: 'white'
  },
});

// This will be updated to have more than just a title!
const TaskCartCard = (props) => {
  const [open, setOpen] = useState(false);
  const [completeList, setCompleteList] = useContext(TasksContext);
  const classes = myTasksStyles();

  const handleCardOpen = () => {
    setOpen(true);
  };

  const handleUnaccept = () => {
    let myTask = props.task;
    myTask.acceptedBy = null;
    myTask.status = 'unstarted';
    const db = firebase.database().ref()
    db.child('tasks/' + myTask.id + '/acceptedBy/').set(null);
    db.child('tasks/' + myTask.id + '/acceptedByEmail/').set(null);
    db.child('tasks/' + myTask.id + '/status/').set('unstarted');
    db.child('users/' + props.user.uid + '/to_do/' + myTask.id).remove();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style={
    backgroundColor: 'green',
  };

  const disabled = () => {
    if( props.task.status == "complete") {
      return true;
    } else {
      return false;
    }
  };

  const disable = disabled();

  return (
    <Card className={classes.root}>
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
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {props.task.status}
          </Typography> */}
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
            {props.task.address}
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
          <div className="req-row">
            {/* {props.task.requirements.map((req, index) => (
                <Chip label={req} key={index}></Chip>
            ))} */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnaccept} color="primary">
            Unaccept Task
          </Button>
          {/* <Button onClick={()=>{props.handleComplete(props.task.id); handleClose();}} disabled={disable} autoFocus>
            Complete Task
          </Button> */}
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskCartCard;
