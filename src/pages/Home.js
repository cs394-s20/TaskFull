import React from 'react'

// Custom
import TasksFeed from '../components/TasksFeed';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <TasksFeed></TasksFeed>
    </div>
  )
}

export default Home;
