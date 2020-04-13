import React from 'react'

// Custom
import TasksFeed from '../components/TasksFeed';
import NavBar from '../components/NavBar';
import TaskCart from '../components/TaskCart';
import { TaskCartProvider } from '../components/TaskCartContext';

const Home = () => {
  return (
    <TaskCartProvider>
      <div>
        <NavBar></NavBar>
        
        <TasksFeed></TasksFeed>
      </div>
    </TaskCartProvider>
  )
}

export default Home;
