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
      const requirementsArray = e.map((req, i) => [i, req.value])
      const entries = new Map([requirementsArray]);
      setRequirements(Object.fromEntries(entries));
    }

    const submitForm = (event) => {
      const taskId = uniqid();
      firebase.database().ref('tasks/' + taskId).set({
        id: taskId,
        title: title,
        author: author,
        description: description,
        requirements: requirements
      });
    
      console.log("submitted");
      event.preventDefault();
    }

  return (
    <form onSubmit={e => submitForm(e)}>
      <Grid style={{ padding: "1em" }}>
          <Typography  className="dialog-header" fontWeight={700} variant="h4">
              Please fill this form to create your task
          </Typography>
        <DialogContent>
        <div>
          <TextField id="standard-basic" label="Title" onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
          <TextField id="standard-basic" label="Author" onChange ={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <TextField 
              placeholder="Description"
              multiline
              rows={2}
              rowsMax={4}
              id="standard-basic" label="Title" onChange={e => setDescription(e.target.value)}/>
        </div>
        <Select
          isMulti
          options={options}
          onChange={handleChange}
        />
          <TextField id="standard-basic" label="Address" />
          <TextField id="standard-basic" label="City" />
          <TextField id="standard-basic" label="State" />
        </DialogContent>
                  <DialogActions>
            <Button onClick={() => handleclose()} color="primary">
              Cancel {/* BUG: Cancel not closing the Dialog */}
            </Button>
            <Button type="submit" value="Submit" onClick={() => {handleclose()}} color="primary">
              Submit
            </Button>
          </DialogActions>
      </Grid>
    </form>
  )
}

export default Newtask
