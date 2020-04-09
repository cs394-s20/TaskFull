import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const exampleTasks = [
  {
    title: 'Grocery Store Run',
    author: 'Tracy Chapman',
    location: '2110 CS Drive, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Thu, Apr 9, 2020 6:30 PM',
    expires: '7 days',
    status: 'unstarted'
  },
  {
    title: 'Dog Walking',
    author: 'Patrick Johnson',
    location: '815 Green St, Evanston, IL 60201',
    requirements: ['pets'],
    time: 'Fri, Apr 17, 2020 2:00 PM',
    expires: '9 days',
    status: 'unstarted'
  },
  {
    title: 'Need help moving my couch',
    author: 'Drake Bell',
    location: '565 Greenwood St, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Wed, Aug 9, 2020 6:30 PM',
    expires: '4 mo',
    status: 'unstarted'
  },
  {
    title: 'Fixing a broken bike lock',
    author: 'Todd Meyers',
    location: '42 Blueberry Ln, Evanston, IL 60201',
    requirements: ['physical'],
    time: 'Fri, Apr 10, 2020 5:00 PM',
    expires: '2 days',
    status: 'unstarted'
  },
  {
    title: 'Garden maintenance',
    author: 'Ping',
    location: '832 Emerson St, IL 60201',
    requirements: ['physical'],
    time: 'Thu, Apr 9, 2020 11:30 AM',
    expires: '3 days',
    status: 'in progress'
  },
]

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

// This will be updated to have more than just a title!
const TaskCard = (props) => {
    const classes = useStyles();
  
    return (
      <Card className={'task-card'}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.task.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.task.time}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Accept
          </Button>
          <Button size="small" color="primary">
            Details
          </Button>
          <br></br>
        </CardActions>
      </Card>
    );
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          TaskFull Launch Page
        </h2>
        <p>an app that matches people in need with willing neighbors to help with errands</p>
        {exampleTasks.map((task, index) => 
          <TaskCard task={task} key={index}/>
        )}
      </header>
    </div>
  );
}

export default App;
