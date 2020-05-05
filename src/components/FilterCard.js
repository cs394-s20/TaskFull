import React, { useState, useContext } from 'react';
import '../App.css';
import {TasksContext} from './TasksContext'

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
import citylist from '../cities.json'



// Select
import Select from 'react-select';

var list = [];

const options = [
    { value: 'physical', label: 'Physical' },
    { value: 'car', label: 'Car' },
    { value: 'pets', label: 'Pets' }
  ];

const FilterCard = (props) => {

  const useStyles = makeStyles({
    root: {
      minHeight: 220,
      background: '#ffecb3',
      marginTop: 5,
      marginBottom: 5,
      overflow: 'visible'
    },
    formControl: {
      minWidth: 275,
    },
  });

  const filterStyles = makeStyles({
    root: {
      minHeight: 2,
      background: '#ffecb3',
    },

    typography: {
      fontSize: 15,
      fontWeight: 300
    }
  });

  const classes = useStyles();

  const filterStyle = filterStyles()
  const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };


  return (
    <Card variant="outlined" className={classes.root + " filter-card"}>
 
        <CardContent>
          {/* <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter Tasks:
          </Typography> */}

          {/* <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter by Requirments
          </Typography> */}

          {/* <Select
            className={filterStyle.root}
            defaultValue={options}
            maxMenuHeight={120}
            isMulti
            options={options}
            onChange={props.handleDropdownChange}
          /> */}

          <br/>
          <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter by States:
          </Typography>
          
          <Select
            className={filterStyle.root}
            defaultValue={" "}
            maxMenuHeight={200}
            options={stateList}
            onChange={props.handleStatesChange}
          />

          <Typography className= {filterStyle.typography} gutterBottom variant="h6" component="h6" fontWeight={200}>
            Filter by Cities:
          </Typography>
          

          <Select
            className={filterStyle.root}
            defaultValue={" "}
            maxMenuHeight={150}
            options={props.curCity}
            onChange={props.handleCityChange}
          />
          
        </CardContent>

  
    </Card>
  );
};

export default FilterCard;