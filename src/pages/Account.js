import React, {useState, useEffect } from 'react'
import '../App.css';
import {Redirect} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    textAlign: "center"
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
  }
});


const Account = ({ user }) => {
  const [editing, setEditing] = useState(false)
  const classes = useStyles();
  const [userinfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <NavBar user={user}></NavBar>
      <Editbutton editing={{ editing, setEditing }}/>
      <Profile user={user} editingstate={{ editing, setEditing }} />
    </div>
  )
}

const Editbutton = ({editing}) => {
  if (editing.editing) {
    return <div><Button onClick={() => editing.setEditing(!editing.editing)}>Save Edits</Button></div>;
  } else {
    return <div></div>
  }
};


const Profile = ({ user, editingstate }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user) {
      const db = firebase.database().ref().child('/users').child('/' + user.uid);
      const getUserData = snap => {
        if (snap.val()) {
          setUserData(snap.val());
        }
      }
      db.on('value', getUserData, error => alert(error));
      return () => { db.off('value', getUserData); };
    }
  }, []);
  console.log(userData);

  const getTask = id => {
    console.log(id)
    const db = firebase.database().ref().child('/tasks/' + id).once("value")
      .then(snapshot => {
        const task = snapshot.val()
        if (task) {
          return <p className={classes.info}>
            {task.author} </p>
        }
      })
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
        <div className="account-task-list">
          <p>To Do</p>
          <Grid style={{ padding: "1em", maxWidth: 600, minWidth: 600 }}>
            {userData.posted_tasks ? Object.keys(userData.posted_tasks).map((taskid, i) =>
              <Card className="current-task">
                <CardActionArea className="current-task-action">
                  <p className={classes.info}>{taskid}</p>
                </CardActionArea>
              </Card>
            ) : <span></span>}
          </Grid>
        </div>
        <div className="account-task-list">
          <p>Posted Tasks</p>
          <Grid style={{ padding: "1em" }} item xs={6} >
            {userData.to_do ? Object.keys(userData.to_do).map((taskid, i) =>
              <Card className="past-task">
                <CardActionArea className="past-task-action">
                  {getTask(taskid)}
                </CardActionArea>
              </Card>
            ) : <span></span>}
          </Grid>
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



  // useEffect(() => {
  //   const dbUser = firebase.database().ref().child(`/users/${user.uid}`);
    
    // console.log(dbUser)

  //   const getUser = snap => {
  //     if (snap.val()) {
  //       setUserInfo(Object.values(snap.val()));
  //       console.log(userinfo)
  //       setLoading(false)
  //     }
  //   }
  //   dbUser.on('value', getUser, error => alert(error));
  //   return () => { dbUser.off('value', getUser); };
  // }, []);

  // if (loading) {
  //   return <div>Loading</div>
  // }

  // if (user) {
  //   return (<div>
  //     <NavBar user={user}></NavBar>
  //     <Paper elevation={6}>
  //       My Account
  //     <Typography variant="h3" gutterBottom>
  //       {userinfo.username}
  //     </Typography>
  //     <Typography variant="h6" gutterBottom>
  //       {userinfo.points}
  //     </Typography>
  //     {/* <Typography variant="h6" gutterBottom>
  //       {user.preferences}
  //     </Typography> */}
  //     </Paper>
  //   </div>)
  // }

  // return (
  //   <Redirect to="/"></Redirect>
  // )

export default Account