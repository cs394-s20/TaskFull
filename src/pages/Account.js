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

// ```
// userID: {
//   acceptedTasks: {

//   },
//   CompletedTasks: {

//   },
//   points:
// }

// task: {

// }
// ```

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

  const userObject = {
    points: 10,
    username:'User',
    preferences: {
      value: 'vegan', label: 'Vegan'
    }
  }

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
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  if (!editingstate.editing && user) {
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              My Profile
        </Typography>
            <Typography variant="h5" component="h2">
              {user.displayName}
        </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {userData.points + " points"}
        </Typography>
            <Typography variant="body2" component="p">
              Vegetarian
          <br />
              Trader Joe's
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => editingstate.setEditing(!editingstate.editing)}>Edit Profile</Button>
          </CardActions>
        </Card>
        <div className="account-task-list">
          <p>Current Tasks</p>
          <Grid style={{ padding: "1em", maxWidth:600, minWidth:600 }}>
            <Card className="current-task">
              <CardActionArea className="current-task-action">
                <p className={classes.info}>Linda J.</p>
                <p className={classes.info}>Whole Foods</p>
              </CardActionArea>
            </Card>
            <Card className="current-task">
              <CardActionArea className="current-task-action">
                <p className={classes.info}>Joe S.</p>
                <p className={classes.info}>Wegman's</p>
              </CardActionArea>
            </Card>
          </Grid>
      </div>
        <div className="account-task-list">
          <p>Past Tasks</p>
          <Grid style={{ padding: "1em"}} item xs={6} >
            <Card className="past-task">
              <CardActionArea className="past-task-action">
                <p className={classes.info}>Katie P.</p>
                <p className={classes.info}>CVS</p>
              </CardActionArea>
            </Card>
            <Card className="past-task">
              <CardActionArea className="past-task-action">
                <p className={classes.info}>Cameron M.</p>
                <p className={classes.info}>Shaws</p>
              </CardActionArea>
            </Card>
            <Card className="past-task">
              <CardActionArea className="past-task-action">
                <p className={classes.info}>Elizabeth B.</p>
                <p className={classes.info}>Giant</p>
              </CardActionArea>
            </Card>
            <Card className="past-task">
              <CardActionArea className="past-task-action">
                <p className={classes.info}>Dave C.</p>
                <p className={classes.info}>Jewel</p>
              </CardActionArea>
            </Card>

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
