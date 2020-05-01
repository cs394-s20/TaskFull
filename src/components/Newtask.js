import React, { useState, useContext } from 'react';
import '../App.css';
import uniqid from 'uniqid';
import useForm from './useForm';
import validateForm from './validateForm';
import moment from 'moment';

import {TaskCartContext} from '../components/TaskCartContext'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import SnoozeIcon from "@material-ui/icons/Snooze";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


// Custom
import Select from 'react-select'

// Material UI
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite'


import firebase from 'firebase/app';
import 'firebase/database';

import "./ItemsTable.css";

const options = [
  { value: 'physical', label: 'Physical' },
  { value: 'car', label: 'Car' },
  { value: 'pet', label: 'Pet' },
  { value: 'none', label: 'None'}
];

const Newtask = ({handleclose, user}) => {
  //const [values, setValues] = useState({ title: '', author: '', description: ''});//address: '', city: '', state: ''});
  const [inputList, setInputList] = useState({ item: '', quantity: ''});
  

  // const db = firebase.database().ref().child('/tasks');

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: 550,
    },
    upperfield: {
      marginRight: 50,
      width: 300,
      textAlign: "center",
    },
    desfield:{
      width: 650,
      marginTop: 25,
    },
    newtaskfield:{
      marginTop: 1,
      marginRight: 40,
      width: 220,
    },
    selector: {
     marginTop: 40,
     marginBottom: 80,
     width: 650,
    },

   }));

   const classes = useStyles();


 

//    const handleSelectChange = (e) => {
//     if (!e) return;
//     const requirementsArray = []
//     e.map((req, i) => requirementsArray.push([i, req.value]))
//     const entries = new Map(requirementsArray);
//     console.log(requirements)
//     setRequirements(Object.fromEntries(entries));

// ;  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const {handleTextChange, handleItemsChange, addNewItem, deleteNewItem, getTotalItems, handleSubmit, values, errors} = useForm(submit, validateForm);



  function submit(){
    if (Object.keys(errors).length === 0){

      console.log('Submitted successfully');
      const taskId = uniqid();
      const db = firebase.database().ref()
      const fullAddress = values.address + ', ' + values.city + ', ' + values.state;
      db.child('tasks/' + taskId).set({
        id: taskId,
        title: values.title,
        items: values.items,
        author: values.author,
        authorid: user.uid,
        description: values.description,
        completeBy: selectedDate.toString(),
        address: fullAddress,
        status: "unstarted",
        postedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        acceptedBy: " ",
      })
      db.child('users/' + user.uid + '/posted_tasks/' + taskId).set('unstarted');
      handleclose();
    }
  }


return (
  <form
    onSubmit={handleSubmit}
    noValidate
  >
    <Grid style={{ padding: "1em" }}>
        <Typography className="dialog-header" fontWeight={700} variant="h4">
            Please fill this form for your grocery run
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
            value = {values.author}
            onChange={handleTextChange}
            required
        />
        { errors.author && <p className='error'>{errors.author}</p>}
      </div>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker className={classes.upperfield}
            margin="normal"
            id="date-picker-dialog"
            label="Choose a date"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker  className={classes.upperfield}
            margin="normal"
            id="time-picker"
            label="Choose a time"
            value={selectedDate}
            rightArrowIcon={<SnoozeIcon />}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            keyboardIcon={<AccessTimeIcon/>}
          />
        </MuiPickersUtilsProvider>

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

      {/* <div className="item-input">
        <ItemInputList inputList={inputList} setInputList={setInputList}/>
      </div> */}

      <div className="table">
            <div className="table-title">Items List</div>
            <div className="table-content">
              <div className="table-header">
                <div className="table-row">
                  <div className="table-data">
                    <div>Item</div>
                  </div>
                  <div className="table-data">
                    <div>Quantity</div>
                  </div>
                </div>
              </div>
              <div className="table-body">
                {values.items.map((item, index) => (
                  <div className="table-row" key={index}>
                    <div className="table-data">
                    <TextField
                      className="new-task-field"
                      id="standard-basic"
                      inputProps={{'data-id':index}}
                      label="Item"
                      name="name"
                      value = {item.name}
                      onChange={handleItemsChange}
                      required
                      />
                    </div>
                    <div className="table-data">
                      <TextField
                        className="new-task-field"
                        id="standard-basic"
                        inputProps={{'data-id':index}}
                        label="Quantity"
                        name="quantity"
                        value = {item.quantity}
                        onChange={handleItemsChange}
                        required
                      />
                      <DeleteForeverIcon onClick={deleteNewItem(index)}>-</DeleteForeverIcon>
                    </div>
                  </div>
                ))}
                <div className="table-row">
                  <div className="table-data">
                    <AddCircleIcon onClick={addNewItem}></AddCircleIcon>
                    {/* <button type="button" onClick={addNewItem}>+</button> */}
                  </div>
                </div>
              </div>
              <div className="table-footer">
                <div className="table-row">
                  <div className="table-data">
                <div>Total No. of Items: {values.items.length}</div>
                  </div>
                  
                  <div className="table-data">
                  </div>
                  
                </div>
               
              </div>
            </div>
          </div>
          { errors.items && <p className='error'>{errors.items}</p>}

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
          <Button onClick={()=> !errors ? ()=>handleclose() : null }
            variant="contained"
            type="submit"
            value="Submit"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
    </Grid>
  </form>
)
}

export default Newtask
