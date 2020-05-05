import React, { useContext, useEffect } from 'react';
import {TasksContext} from './TasksContext';
import TaskCartCard from '../components/TaskCartCard';


const TaskCart = ({ user }) => {
    const [tasks, setTasks] = useContext(TasksContext);

    return(
        <div style={{ margin:"1em -1em 1em -1em"}} >
            {/* <div>My Tasks ({taskCart.length})</div> */}
            <div>To Do List</div>
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
}

export default TaskCart;
