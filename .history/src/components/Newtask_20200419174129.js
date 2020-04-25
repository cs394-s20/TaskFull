import React, { useState, useContext } from 'react';
import '../App.css';
import uniqid from 'uniqid';
import useForm from './useForm';
import validateForm from './validateForm';
import "../index.css";

import {TaskCartContext} from '../components/TaskCartContext'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';


import { Dropdown } from 'semantic-ui-react'

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
    //const [title, setTitle] = useState('');
    //const [author, setAuthor] = useState('');
    //const [description, setDescription] = useState('');
    //const [values, setValues] = useState({ title: '', author: '', description: ''});//address: '', city: '', state: ''});
    //const [requirements, setRequirements] = useState({});
  
    // const db = firebase.database().ref().child('/tasks');

    // const handleChange = (e) => {
    //   if (!e) return;
    //   const requirementsArray = []
    //   e.map((req, i) => requirementsArray.push([i, req.value]))
    //   const entries = new Map(requirementsArray); 
    //   setRequirements(Object.fromEntries(entries));
    // }

    const {handleTextChange, handleSelectChange, handleSubmit, values, errors} = useForm(submit, validateForm);

  
    function submit(){
      console.log('Submitted successfully');
    }
    // const submitForm = (event) => {
    //   event.preventDefault();
    //   const taskId = uniqid();
    //   firebase.database().ref('tasks/' + taskId).set({
    //     id: taskId,
    //     title: values.title,
    //     author: values.author,
    //     description: values.description,
    //     //status: "unstarted",
    //     //requirements: requirements
    //   });
    
    //   console.log("submitted");
      
    // }

  return (
    <form 
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid style={{ padding: "1em" }}>
          <Typography className="dialog-header" fontWeight={700} variant="h4">
              Please fill this form to create your task
          </Typography>
          <Typography className="dialog-header" fontWeight={400} variant="subtitle">
              It only takes 2 minutes!
          </Typography>
        <DialogContent>
        <div>
          <TextField 
            className="new-task-field" 
            id="standard-basic" 
            label="Title"
            name="title" 
            value = {values.title}
            onChange={handleTextChange}
            //onChange={e => setTitle(e.target.value)}
            required
            />
          { errors.title && <p className='error'>{errors.title}</p>}
        </div>
        <div>
          <TextField 
            className="new-task-field" 
              id="standard-basic" 
              label="Author" 
              name="author"
              //onChange ={e => setAuthor(e.target.value)}
              value = {values.author}
              onChange={handleTextChange}
              required
          />
          { errors.author && <p className='error'>{errors.author}</p>}
        </div>
        <div>
          <TextField 
              className="new-task-field"
              multiline
              rowsMax={4}
              id="standard-basic" 
              label="Description" 
              name="description"
              //onChange={e => setDescription(e.target.value)}
              value = {values.description}
              onChange={handleTextChange}
              required
              />
            { errors.description && <p className='error'>{errors.description}</p>}
        </div>
        {/* <Dropdown
          fluid multiple selection options={options}
        /> */}

        
        <Select
          name='req-dropdown'
          value
          placeholder="Select Task Requirements"
          className="new-task-field"
          isMulti
          options={options}
          onChange={handleSelectChange('requirements')}
        />
        <div>
          <TextField 
            className="new-task-field" 
            id="standard-basic" 
            label="Address"
            name="address"
            onChange={handleTextChange} 
            value = {values.address}
            required
          />
          <TextField 
            className="new-task-field" 
            id="standard-basic" 
            label="City" 
            name="city"
            onChange={handleTextChange}
            value = {values.city}
            required
          />
        
          <TextField 
            className="new-task-field" 
            id="standard-basic" 
            label="State" 
            name="state"
            onChange={handleTextChange}
            value = {values.state}
            required
          />
          </div>
          { errors.address && <p className='error'>{errors.address}</p>}
          
       
        </DialogContent>
                  <DialogActions>
            <Button onClick={() => handleclose()} color="primary">
              Cancel 
            </Button>
            <Button variant="contained" type="submit" value="Submit" color="primary">
              Submit
            </Button>
          </DialogActions>
      </Grid>
    </form>
  )
}

export default Newtask
