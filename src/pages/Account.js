import React from 'react'
import {Redirect} from 'react-router-dom';
import NavBar from '../components/NavBar';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const Account = ({user}) => {

  if (user) {
    return (<div>
      <NavBar user={user}></NavBar>
      <Paper elevation={6}>
        My Account
      <Typography variant="h3" gutterBottom>
        {user.displayName}
      </Typography>
      </Paper>
    </div>)
  }

  return (
    <Redirect to="/"></Redirect>
  )
}

export default Account
