import React, { useContext, useEffect } from 'react';
import {TasksContext} from './TasksContext';
import TaskCartCard from '../components/TaskCartCard';
import { makeStyles } from '@material-ui/core/styles';




const TaskCart = ({ user }) => {
    const [tasks, setTasks] = useContext(TasksContext);

    const cartStyles = makeStyles({
        root: {
          border: '1px solid black',
          marginBottom: 4
        }
    
      });
    
    const classes = cartStyles();

    if (tasks.filter(t => t.status === 'in-progress' && t.acceptedBy == user.uid).length === 0) {
        return (
            <div style={{ margin: "1em -1em 1em -1em" }} >
                <h3>To Do List</h3>
            <div>
                <p>You have no active tasks to do.</p>
            </div>
            </div>
        )
    } else {

    return(
        <div style={{ margin:"1em -1em 1em -1em"}} >
            <h3>To Do List</h3>
            <div style={{marginTop: -8}}>{tasks.filter(t=>t.status==='in-progress' && t.acceptedBy == user.uid).map((task,index)=>(
                <TaskCartCard
                
                key={task.id}
                task={task}
                index={index}
                class={task.status}
                user={user}
                >
                    {task.title}
            </TaskCartCard>)
            )}</div>
        </div>
    )
}}

export default TaskCart;
