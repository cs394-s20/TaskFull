import React, { useState, useEffect }from 'react'

import '../App.css';
import TaskCard from './TaskCard';
import Filter from './Filter';

import Grid from '@material-ui/core/Grid';

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

const exampleTasks = [
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    title: 'Grocery Store Run',
    author: 'Tracy Chapman',
    description: 'I need help getting to the grocery store and carrying my bags.',
    location: '2110 CS Drive, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Thu, Apr 9, 2020 6:30 PM',
    expires: '7 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-4250-8dcf-dc8c4aefc001',
    title: 'Dog Walking',
    author: 'Patrick Johnson',
    description: 'I need someone to walk my dogs while my wife is sick.',
    location: '815 Green St, Evanston, IL 60201',
    requirements: ['pets'],
    time: 'Fri, Apr 17, 2020 2:00 PM',
    expires: '9 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc002',
    title: 'Need help moving my couch',
    author: 'Drake Bell',
    description: 'I\'m looking for someone to help me carry my couch out of my house. I can provide a facemask!',
    location: '565 Greenwood St, Evanston, IL 60201',
    requirements: ['physical', 'car'],
    time: 'Wed, Aug 9, 2020 6:30 PM',
    expires: '4 mo',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc003',
    title: 'Fixing a broken bike lock',
    author: 'Todd Meyers',
    description: 'My bike lock seems to be broken and I cannot figure out how to fix it. Tried W-40.',
    location: '42 Blueberry Ln, Evanston, IL 60201',
    requirements: ['physical'],
    time: 'Fri, Apr 10, 2020 5:00 PM',
    expires: '2 days',
    status: 'unstarted'
  },
  {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc004',
    title: 'Garden maintenance',
    author: 'Ping',
    description: 'I don\'t know anything about gardening but want to get started!',
    location: '832 Emerson St, IL 60201',
    requirements: ['physical'],
    time: 'Thu, Apr 9, 2020 11:30 AM',
    expires: '3 days',
    status: 'in-progress'
  }]

const TasksFeed = () => {
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState({})

  const handleAccept = id => {
    const newTasks = [...tasks];
    newTasks.find(t => t.id === id).status = 'in-progress';
    setTasks(tasks);
  }

  useEffect(() => {
    // In the real app we will fetch from our API
    const db = firebase.database().ref();
    db.on('value', snap => console.log(snap))

    setTasks(exampleTasks)
  }, [])

  const handleQuery = (query) => {
    setQuery(query)
  }

  return (
    <Grid container spacing={2}>
      <Grid style={{ padding: "1em" }} item xs={3} >
        <Filter onChange={handleQuery}></Filter>
      </Grid>
      <Grid item xs={6}>
        {tasks.filter(t => t.status === 'unstarted').map((task, index) => (
            <TaskCard 
                key={task.id}
                task={task} 
                index={index}
                class={task.status}
                handleAccept={handleAccept}
                />
        ))}
      </Grid>
    </Grid>
  )
}

export default TasksFeed;