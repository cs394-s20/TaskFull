import React, { useState, useContext } from 'react';
import '../App.css';
import uniqid from 'uniqid';
import useForm from './useForm';
import validateForm from './validateForm';

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

import firebase from 'firebase/app';
import 'firebase/database';

const options = [
  { value: 'physical', label: 'Physical' },
  { value: 'car', label: 'Car' },
  { value: 'pet', label: 'Pet' },
  { value: 'none', label: 'None'}
];

const Newtask = ({handleclose, user}) => {
  //const [title, setTitle] = useState('');
  //const [author, setAuthor] = useState('');
  //const [description, setDescription] = useState('');
  //const [values, setValues] = useState({ title: '', author: '', description: ''});//address: '', city: '', state: ''});
  const [inputList, setInputList] = useState();
  

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

   const [length, setLength] = useState(1);
   const ItemInput = ({input}) => {
     return (
       <div>
        <TextField
          className="item-box"
          id="standard-basic"
          label="Item"
          name="item"
          value = {input.item}
          onChange={handleTextChange}
          //onChange={e => setTitle(e.target.value)}
          required
          />
        <TextField
          className="item-box"
          id="standard-basic"
          label="Quantity"
          name="quantity"
          value = {input.quantity}
          onChange={handleTextChange}
          //onChange={e => setTitle(e.target.value)}
          required
          />
          <DeleteForeverIcon onClick={() => {setLength(length-1)}}>-</DeleteForeverIcon>
       </div>
     )
   }

   
  const ItemInputList = ({inputList, setInputList}) => {
    
    let lst = [];
    let children = [];
    for(let i = 0; i < length; i++){
      children.push(e => <ItemInput input={e}/>);
    }
    lst.push(children);

    return (
      // <div>
      //   {inputList.map(elem => <ItemInput input={elem}/>)}
      //   <div className="item-list-btns">
          // <Button onClick={() => {setInputList([...inputList, {item: "", quantity: ""}])}}>+</Button>
          
      //   </div>
      // </div>
      <div>
        {lst}
        <AddCircleIcon onClick={() => {setLength(length+1)}}></AddCircleIcon>
      </div>
    )
  }

 

//    const handleSelectChange = (e) => {
//     if (!e) return;
//     const requirementsArray = []
//     e.map((req, i) => requirementsArray.push([i, req.value]))
//     const entries = new Map(requirementsArray);
//     console.log(requirements)
//     setRequirements(Object.fromEntries(entries));

// ;  }

  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  const {handleTextChange, handleDropdownChange, handleSubmit, values, errors} = useForm(submit, validateForm);


  function submit(){
    if (Object.keys(errors).length === 0){

      console.log('Submitted successfully');
      const taskId = uniqid();
      firebase.database().ref('tasks/' + taskId).set({
        id: taskId,
        title: values.title,
        author: values.author,
        authorid: user.uid,
        description: values.description,
        status: "unstarted",
        requirements: values.requirements
      })
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

      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          />
        </MuiPickersUtilsProvider> */}

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

      <div className="item-input">
        <ItemInputList inputList={inputList} setInputList={setInputList}/>
      </div>

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
