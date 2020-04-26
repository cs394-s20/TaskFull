import React, { useState, useContext } from 'react';
import '../App.css';
import uniqid from 'uniqid';

import {TaskCartContext} from '../components/TaskCartContext'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';


// Custom
import Select from 'react-select'

// Material UI
import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app';
import 'firebase/database';

const options = [
  { value: 'physical', label: 'Physical' },
  { value: 'car', label: 'Car' },
  { value: 'pet', label: 'Pet' }
];

const Newtask = ({handleclose}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState({});
  
    // const db = firebase.database().ref().child('/tasks');

    const handleChange = (e) => {
      if (!e) return;
      const requirementsArray = []
      e.map((req, i) => requirementsArray.push([i, req.value]))
      const entries = new Map(requirementsArray);
      setRequirements(Object.fromEntries(entries));
    }

    const submitForm = (event) => {
      const taskId = uniqid();
      firebase.database().ref('tasks/' + taskId).set({
        id: taskId,
        title: title,
        author: author,
        description: description,
        //status: "unstarted",
        requirements: requirements
      });
    
      console.log("submitted");
      event.preventDefault();
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        height: 600,
      },
      newtaskfield:{
        marginTop: 1,
        marginRight: 10,
        width: 220,
      },
     }));

     const classes = useStyles();


  return (
    <form onSubmit={e => submitForm(e)}>
      <Grid style={{ padding: "1em" }}>
          <Typography className="dialog-header" fontWeight={700} variant="h4">
              Please fill this form to create your task
          </Typography>
          <Typography className="dialog-header" fontWeight={400} variant="subtitle">
              It only takes 2 minutes!
          </Typography>
        <DialogContent>
        <div>
          <TextField className={classes.newtaskfield} id="standard-basic" label="Title" onChange={e => setTitle(e.target.value)}/>
          <TextField className={classes.newtaskfield} id="standard-basic" label="Author" onChange ={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <TextField 
              className={classes.newtaskfield}
              multiline
              rowsMax={4}
              id="standard-basic" label="Description" onChange={e => setDescription(e.target.value)}/>
        </div>
        <Select
          placeholder="Select Task Requirements"
          className="new-task-field"
          isMulti
          options={options}
          onChange={handleChange}
        />
          <TextField className={classes.newtaskfield} id="standard-basic" label="Address" />
          <TextField className={classes.newtaskfield} id="standard-basic" label="City" />
          <TextField className={classes.newtaskfield} id="standard-basic" label="State" />
        </DialogContent>
                  <DialogActions>
            <Button onClick={() => handleclose()} color="primary">
              Cancel 
            </Button>
            <Button variant="contained" type="submit" value="Submit" onClick={() => {handleclose()}} color="primary">
              Submit
            </Button>
          </DialogActions>
      </Grid>
    </form>
  )
}

export default Newtask
