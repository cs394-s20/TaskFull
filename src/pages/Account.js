import React, {useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '@material-ui/core/Button';

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


const Account = ({ user }) => {
  const [editing, setEditing] = useState(false)

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
      <Editbutton editing={{ editing, setEditing }}/>
      <Profile editing={editing} currUser={userinfo} />
    </div>
  )
}

const Editbutton = ({editing}) => {
  if (editing.editing) {
    return <div><Button onClick={() => editing.setEditing(!editing.editing)}>Save Edits</Button></div>;
  } else {
    return <div><Button onClick={() => editing.setEditing(!editing.editing)}>Edit Profile</Button></div>;
  }
};


const Profile = ({ editing, currUser }) => {
  if (!editing) {
    return (
      <div>
      <Typography variant="h3" gutterBottom>
          Patrice Power
      </Typography>
      <p>Current Tasks</p>
      <p>Past Tasks</p>
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
