import React from 'react'

// Custom
import TasksFeed from '../components/TasksFeed';
import NavBar from '../components/NavBar';
import TaskCart from '../components/TaskCart';
import { TaskCartProvider } from '../components/TaskCartContext';
import '../styling/Home.css';
import AddIcon from '@material-ui/icons/Add';


const Home = ({user}) => {
  return (
    <TaskCartProvider>
      <div>
        <NavBar user={user}></NavBar>

        <TasksFeed></TasksFeed>
        <div className ="addTask"><AddIcon className ='fixPlus'/></div>
      </div>
    </TaskCartProvider>
  )
}

export default Home;
