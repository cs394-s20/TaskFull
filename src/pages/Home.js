import React, {useEffect} from 'react'

// Custom
import TasksFeed from '../components/TasksFeed';
import NavBar from '../components/NavBar';
import TaskCart from '../components/TaskCart';
import { TasksProvider } from '../components/TasksContext';

const Home = ({user}) => {

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <TasksProvider>
      <div>
        <NavBar user={user}></NavBar>

        <TasksFeed user={user}></TasksFeed>
      </div>
    </TasksProvider>
  )
}

export default Home;
