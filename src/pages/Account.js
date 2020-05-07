import React, { useState, useEffect } from 'react'
import '../App.css';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NotesIcon from '@material-ui/icons/Notes';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// user - google
//   - displayname
//   - uid
// user - database
//   - pionts
//   - name
//   - accepted


// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

const useStyles = makeStyles({
  root: {
    textAlign: "center !important",
    margin: "auto !important"
  },
  info: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,

  },
  stats: {
    width: "100%",
    textAlign: "left",
    marginTop: 20,
    padding: "0 0 0 30%"
  },
  preferences: {
    width: "100%",
    textAlign: "left",
    padding: "0 0 0 30%"
  },
  accountinfo: {
    width: "100%",
  },
  completebutton: {
    marginBottom: 5,
    fontSize: 8,
  },
});


const Account = ({ user }) => {
  const [editing, setEditing] = useState(false)
  const classes = useStyles();
  const [userinfo, setUserInfo] = useState([]);

  if (!user) {
    return <div>Loading</div>
  }

  return (
    <div>
      <NavBar user={user}></NavBar>
      <Editbutton editing={{ editing, setEditing }} />
      <Profile user={user} editingstate={{ editing, setEditing }} />
    </div>
  )
}

const Editbutton = ({ editing }) => {
  if (editing.editing) {
    return <div><Button onClick={() => editing.setEditing(!editing.editing)}>Save Edits</Button></div>;
  } else {
    return <div></div>
  }
};

const Profile = ({ user, editingstate, loadingstate }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [alltasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const db = firebase.database().ref().child('/users/' + user.uid);
      const getUserData = snap => {
        if (snap.val()) {
          setUserData(snap.val());
        }
      }
      db.on('value', getUserData, error => alert(error));
      // return () => { db.off('value', getUserData); };

      const db2 = firebase.database().ref().child('/tasks');

      const getAllTasks = snap => {
        if (snap.val()) {
          setAllTasks(Object.values(snap.val()));
        }
      }
      db2.on('value', getAllTasks, error => alert(error));
      return () => { db2.off('value', getUserData); db.off('value', getAllTasks); };
    }
  }, []);


  function getPostedTasks() {
    alltasks.filter(t => t.authorid === user.uid).map((task) => {
      return (
        <Card className="past-task">
          <CardActionArea className="past-task-action">
            <p className={classes.info}>{task.title}</p>
          </CardActionArea>
        </Card>)
    })
  }

  const checkIfPostedTasks = () => {
    if (alltasks.filter(t => t.authorid === user.uid && t.status !== 'completed').length == 0) {
      return <div>You have no active posted tasks.</div>
    } else {
      return (
        <Grid style={{ padding: "1em", maxWidth: 600 }} >
          {alltasks.filter(t => t.authorid === user.uid && t.status !== 'completed').map((task) =>
            <PostedTasks user={user} task={task} classes={classes} />)}
        </Grid>
      )
    }
  }

  const checkIfToDoTasks = () => {
    if (alltasks.filter(t => t.acceptedBy === user.uid && t.status === 'in-progress').length == 0) {
      return <div>You have no tasks to complete.</div>
    } else {
      return (
        <Grid style={{ padding: "1em", maxWidth: 600 }}>
          {alltasks.filter(t => t.acceptedBy === user.uid && t.status === 'in-progress').map((task) =>
            <ToDoTasks user={user} task={task} classes={classes} />)}
        </Grid>
      )
    }
  }


  if (!editingstate.editing && user) {
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              My Profile
            </Typography>
            <Typography variant="h5" component="h2">
              {userData.username}
            </Typography>
            <Typography variant="body1" component="h2">
              {user.email}
            </Typography>
            <Typography color="textSecondary">
              {userData.points + " points"}
            </Typography>
            {userData.preferences ? userData.preferences.map((pref, i) =>
              <Typography variant="body2" component="p" key={i}>
                {pref}
              </Typography>
            ) : <span></span>}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => editingstate.setEditing(!editingstate.editing)}>Edit Profile</Button>
          </CardActions>
        </Card>
        <div className="my-tasks">
          <div className="account-task-list">
            <h3>To Do List</h3>
            {checkIfToDoTasks()}
          </div>
          <div className="account-task-list">
            <h3>Posted Tasks</h3>
            {checkIfPostedTasks()}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        EDIT MODE
      </Typography>
    </div>
  )
}

const PostedTasks = ({ user, task, classes }) => {
  const useStyles = makeStyles({
    root: {
      // minWidth: 190,
      width: 550,
      background: '#ffecb3',
      // background: '#3f51b5',
      // color: 'white',
      marginTop: 5,
      marginBottom: 5,
    },
    button: {
      // background: '#ff9e80',
      background: '#3f51b5',
      color: 'white',
    }
  });

  const db = firebase.database().ref()

  const [open, setOpen] = useState(false);

  const handlePostedCardOpen = () => {
    setOpen(true);
  };

  const handleTaskCompleted = () => {
    setOpen(false);
    db.child('users/' + user.uid + '/posted_tasks/' + task.id).set('completed');
    db.child('tasks/' + task.id + '/status/').set('completed');
    db.child('/users/' + task.acceptedBy + '/points/').once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            const points = snapshot.val()
            console.log(points)
            db.child('users/' + task.acceptedBy + '/points/').set(points + 1);
          }
        })
        .catch(e => console.error(e))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUser = acceptedBy => {
    if (user != null) {
      db.child('/users/' + acceptedBy).once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            return snapshot.val()
          }
        })
        .catch(e => console.error(e))
    }
  }

  const ContactBox = ({ task }) => {
    if (!task.acceptedByEmail) {
      return <div>No one has accepted your task yet 😢</div>
    } else {
      return (
        <div>
          <Typography gutterBottom component="p" variant="body1">
            Your task was accepted! 😄
          </Typography>
          <a href={"mailto:" + task.acceptedByEmail} style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">Contact Runner</Button></a>
        </div>
      )
    }
  }

  return (<Card className="past-task">
    <CardActionArea onClick={() => handlePostedCardOpen(task)} className="past-task-action">
      <h3 className={classes.info}>{task.title}</h3>
      <p className={classes.info}>{task.author}</p>
    </CardActionArea>
    <Dialog
      open={open}
      fullWidth
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <span className="field-row">
          <AccountCircle className="field-icon" />
          <Typography variant="body1" component="p" color="textSecondary" pb={3}>
            {task.author}
          </Typography>
        </span>
        <span className="field-row">
          <ScheduleIcon className="field-icon" />
          <Typography variant="body2" component="p" color="textSecondary" pb={3}>
            {task.completeBy}
          </Typography>
        </span>
        <span className="field-row">
          <NotesIcon className="field-icon" />
          <Typography gutterBottom component="p" variant="body1">
            {task.description}
          </Typography>
        </span>
        <span className="field-row">
          <ContactBox task={task}></ContactBox>
        </span>
      </DialogContent>
      <DialogActions>
        <Button style={{ background: '#3f51b5', color: 'white' }} onClick={() => handleTaskCompleted(task)}>
          Task Completed
        </Button>
      </DialogActions>
    </Dialog>
  </Card>)
}

const ToDoTasks = ({ user, task, classes }) => {
  const [open, setOpen] = useState(false);

  const handleToDoCardOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnaccept = () => {
    setOpen(false);
    const db = firebase.database().ref()
    db.child('tasks/' + task.id + '/acceptedBy/').set(' ');
    db.child('tasks/' + task.id + '/status/').set('unstarted');
    db.child('users/' + user.uid + '/to_do/' + task.id).remove();
  };

  return (<Card className="current-task">
    <CardActionArea onClick={() => handleToDoCardOpen(task)} className="current-task-action">
      <h3 className={classes.info}>{task.title}</h3>
      <p className={classes.info}>{task.author}</p>
    </CardActionArea>
    <Dialog
      open={open}
      fullWidth
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <span className="field-row">
          <AccountCircle className="field-icon" />
          <Typography variant="body1" component="p" color="textSecondary" pb={3}>
            {task.author}
          </Typography>
        </span>
        <span className="field-row">
          <ScheduleIcon className="field-icon" />
          <Typography variant="body2" component="p" color="textSecondary" pb={3}>
            {task.completeBy}
          </Typography>
        </span>
        <span className="field-row">
          <NotesIcon className="field-icon" />
          <Typography gutterBottom component="p" variant="body1">
            {task.description}
          </Typography>
        </span>
      </DialogContent>
      <DialogActions>
        <Button style={{ background: '#3f51b5', color: 'white' }} onClick={() => handleUnaccept(task)}>
          Unaccept Task
        </Button>
      </DialogActions>
    </Dialog>
  </Card>)
}

export default Account