import React, { useState, useContext } from 'react';
import '../App.css';
import {TaskCartContext} from '../components/TaskCartContext'

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

const DialogHeader = (props) => {
  return (
    <Typography className="dialog-header" fontWeight={700} variant="h4">{props.children}</Typography>
  )
}

// This will be updated to have more than just a title!
const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [taskCart, setTaskCart] = useContext(TaskCartContext);

  const handleCardOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = () => {
    const myTask = props.task;
    setTaskCart(curr => [...curr, myTask]);
  }
  
  const style={
    backgroundColor: 'green',
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
  
    },
    bullet: {
      background: 'ffde59',
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
          <div>{Object.values(props.task.requirements).map((req, index) => (
            <Chip label={req} key={index} className="req-chip"></Chip>
          ))}
          </div>
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
            {props.task.location}
          </Typography>
          </span>
          <span className="field-row">
            <ScheduleIcon className="field-icon"/>
            <Typography variant="body2" component="p" color="textSecondary" pb={3}>
              {props.task.time}
            </Typography>
          </span>
          <span className="field-row">
            <NotesIcon className="field-icon" />
            <Typography gutterBottom component="p" variant="body1">
              {props.task.description}
            </Typography>
          </span>
          <div className="req-row">
            {Object.values(props.task.requirements).map((req, index) => (
                <Chip label={req} key={index} className="req-row"></Chip>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{props.handleAccept(props.task.id); handleClose(); addToCart()}} autoFocus>
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskCard;