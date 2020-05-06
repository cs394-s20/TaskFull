import React, { useState, useContext } from 'react';
import '../App.css';
import uniqid from 'uniqid';
import useForm from './useForm';
import validateForm from './validateForm';
import moment from 'moment';

import {TasksContext} from './TasksContext'

// Material UI
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
import citylist from '../cities.json'
import stateList from '../states.json'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// Custom
//import Select from 'react-select'

// Material UI
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite'


import firebase from 'firebase/app';
import 'firebase/database';

import "./ItemsTable.css";

// const options = [
//   { value: 'AL', label: 'AL' },
//   { value: 'MA', label: 'MA' },
//   { value: 'GA', label: 'GA' },
//   { value: 'CA', label: 'CA'}
// ];

// ------- STATE DROPDOWN COMPONENT STYLING --------
const stateDropdownStyles = makeStyles(theme => ({
 
  formControl: {
    margin: theme.spacing(2.05),
    minWidth: 120
  }
}));

// ------- NEWTASK FORM COMPONENT --------
const Newtask = ({handleclose, user}) => {
  const [inputList, setInputList] = useState({ item: '', quantity: ''});
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
      width: 220
    },
    selector: {
     marginTop: 40,
     marginBottom: 80,
     width: 650,
    },

   }));

   const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    console.log(date.valueOf())
    console.log(Date.now())
    if (date.valueOf() > Date.now()){
      setSelectedDate(date);
    }
    else{
      return
    }
  };
  const {handleTextChange, handleItemsChange, addNewItem, deleteNewItem, handleDateChange2, handleSubmit, values, errors} = useForm(submit, validateForm);

  // ----- CITY DROPDOWN FIELD COMPONENT ------
  const CitySelect = ({}) => {
    const classes = stateDropdownStyles();
    const [state, setState] = useState("");
    const [open, setOpen] = useState(false);

    const list = [];
    let stateFullname = [];
    stateList.map(each => {
      if(values.state == each.value){
        stateFullname.push(each.label);
      }
    })

    citylist.map(each => {
      if(each.state == stateFullname[0]){
        list.push(each.label);
      }
    })    

    const USstates = ['AK', 'AL', 'AR', 'AS', 'AZ', 
                      'CA', 'CO', 'CT', 'DC', 'DE', 
                      'FL', 'FM', 'GA', 'GU', 'HI', 
                      'IA', 'ID', 'IL', 'IN', 'KS', 
                      'KY', 'LA', 'MA', 'MD', 'ME', 
                      'MH', 'MI', 'MN', 'MO', 'MP', 
                      'MS', 'MT', 'NC', 'ND', 'NE', 
                      'NH', 'NJ', 'NM', 'NV', 'NY', 
                      'OH', 'OK', 'OR', 'PA', 'PR', 
                      'PW', 'RI', 'SC', 'SD', 'TN', 
                      'TX', 'UT', 'VA', 'VI', 'VT', 
                      'WA', 'WI', 'WV', 'WY'];

  
    const handleChange = event => {
      setState(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    
    return (
      <div>
        <FormControl className={classes.formControl} required>
          <InputLabel id="state-select-label">City</InputLabel>
          <Select 
            labelId="state-controlled-open-select-label"
            id="state-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={values.city}
            name="city"
            onChange={handleTextChange}
            className='.state-select-field'
          >
            <MenuItem value="">
              <em>Choose a City</em>
            </MenuItem>
            {list.map( city => (<MenuItem value ={city}>{city}</MenuItem>))}
          </Select>
        </FormControl>
      </div>
    );
  }

  // ----- STATE DROPDOWN FIELD COMPONENT ------
  const StateSelect = ({}) => {
    const classes = stateDropdownStyles();
    const [state, setState] = useState("");
    const [open, setOpen] = useState(false);

    const USstates = ['AK', 'AL', 'AR', 'AS', 'AZ', 
                      'CA', 'CO', 'CT', 'DC', 'DE', 
                      'FL', 'FM', 'GA', 'GU', 'HI', 
                      'IA', 'ID', 'IL', 'IN', 'KS', 
                      'KY', 'LA', 'MA', 'MD', 'ME', 
                      'MH', 'MI', 'MN', 'MO', 'MP', 
                      'MS', 'MT', 'NC', 'ND', 'NE', 
                      'NH', 'NJ', 'NM', 'NV', 'NY', 
                      'OH', 'OK', 'OR', 'PA', 'PR', 
                      'PW', 'RI', 'SC', 'SD', 'TN', 
                      'TX', 'UT', 'VA', 'VI', 'VT', 
                      'WA', 'WI', 'WV', 'WY'];

  
    const handleChange = event => {
      setState(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    
  
    return (
      <div>
        <FormControl className={classes.formControl} required>
          <InputLabel id="state-select-label">State</InputLabel>
          <Select 
            labelId="state-controlled-open-select-label"
            id="state-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={values.state}
            name="state"
            onChange={handleTextChange}
            className='.state-select-field'
          >
            <MenuItem value="">
              <em>Choose a State</em>
            </MenuItem>
            {USstates.map( state => (<MenuItem value ={state}>{state}</MenuItem>))}
          </Select>
        </FormControl>
      </div>
    );
  }


  function submit(){
    if (Object.keys(errors).length === 0){
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
        milliseconds: selectedDate.valueOf(),
        address: fullAddress,
        status: "unstarted",
        postedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        acceptedBy: null,
        acceptedByEmail: null,
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
            name="date"
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
            value = {values.description}
            onChange={handleTextChange}
            required
            />
          { errors.description && <p className='error'>{errors.description}</p>}
      </div>

      <div className="table">
            <div className="table-title">Items List</div>
            <div className="table-content">

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
                      <DeleteForeverIcon style={{display: 'inline', fill:"#616161", fontSize:27, cursor: 'pointer'}} onClick={deleteNewItem(index)}>-</DeleteForeverIcon>
                    </div>
                  </div>
                ))}
                <div className="table-row">
                  <div className="table-data">
                    <AddCircleIcon style={{fill:"#616161", cursor: 'pointer'}} onClick={addNewItem}></AddCircleIcon>
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

      <div className='entire-address-field'>
      <TextField
          className="new-task-field"
          id="standard-basic"
          label="Address"
          name="address"
          onChange={handleTextChange}
          value = {values.address}
          required
        />
      <StateSelect/>  
      <CitySelect/>
      

        
        
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
