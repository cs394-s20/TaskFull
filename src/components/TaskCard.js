import React, { useState } from 'react';
import '../App.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

// This will be updated to have more than just a title!
const TaskCard = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleCardOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const style={
    backgroundColor: 'green',
  };


  return (
    <Card className={"task-card-" + props.task.status}>
      <CardActionArea onClick={() => handleCardOpen(props.task)}>
        <CardContent>
          <Typography gutterBottom variant="h4" fontWeight={700}>
            {props.task.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.task.description}
          </Typography>
          <div className='card-last-row'>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.task.time}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.task.status}
          </Typography>
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
        <DialogTitle>
          <Typography fontWeight={700} variant='h4'>{props.task.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <span className="field-row">
            <AccountCircle className="field-icon" />
            <Typography variant="body1" color="textSecondary" pb={3}>
              {props.task.author}
            </Typography>
          </span>
          <span class="field-row">
          <PinDropIcon className="field-icon" />
          <Typography variant="body2" color="textSecondary" pb={3}>
            {props.task.location}
          </Typography>
          </span>
          <span class="field-row">
            <ScheduleIcon className="field-icon"/>
            <Typography variant="body2" color="textSecondary" pb={3}>
              {props.task.time}
            </Typography>
          </span>
          <span class="field-row">
            <NotesIcon className="field-icon" />
            <Typography gutterBottom variant="body1">
              {props.task.description}
            </Typography>
          </span>
          <div className="req-row">
            {props.task.requirements.map((req, index) => (
                <Chip label={req} key={index}></Chip>
            ))}
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{props.handleAccept(props.index); handleClose()}} autoFocus>
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskCard;