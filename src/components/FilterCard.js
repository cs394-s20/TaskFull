import React, { useState, useContext } from 'react';
import '../App.css';
import {TaskCartContext} from '../components/TaskCartContext'

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import stateList from '../states.json'



// Select
import Select from 'react-select';

const options = [
    { value: 'physical', label: 'Physical' },
    { value: 'car', label: 'Car' },
    { value: 'pets', label: 'Pets' }
  ];

const FilterCard = (props) => {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 420,
      background: '#ffecb3',
      marginTop: 5,
      marginBottom: 5,
    },
    formControl: {
     
      minWidth: 275,
    },
    selectEmpty: {
    
    },
  });

  const filterStyles = makeStyles({
    root: {
      minWidth: 220,
      minHeight: 2,
      background: '#ffecb3',
     
    //   marginBottom: 100,
    },

    typography: {
      fontSize: 15,
      fontWeight: 300
    }
  });

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };


  const filterStyle = filterStyles()
  const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

  return (
    <Card variant="outlined" className={classes.root}>
 
        <CardContent>
          <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter Tasks:
          </Typography>

          <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter by Requirments
          </Typography>

          <Select
            className={filterStyle.root}
            defaultValue={options}
            maxMenuHeight={120}
            isMulti
            options={options}
            onChange={props.handleDropdownChange}
          />

          <br/>
          <br/>
          <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter by States:
          </Typography>
          
          <Select
            className={filterStyle.root}
            defaultValue={" "}
            maxMenuHeight={150}
            options={stateList}
            onChange={props.handleStatesChange}
          />
          
          
        </CardContent>

  
    </Card>
  );
};

export default FilterCard;