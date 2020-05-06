import React, { useContext, useEffect } from 'react';
import {TasksContext} from './TasksContext';
import TaskCartCard from '../components/TaskCartCard';


const TaskCart = ({ user }) => {
    const [tasks, setTasks] = useContext(TasksContext);

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
            {/* <div>My Tasks ({taskCart.length})</div> */}
            <h3>To Do List</h3>
            <div>{tasks.filter(t=>t.status==='in-progress' && t.acceptedBy == user.uid).map((task,index)=>(
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
