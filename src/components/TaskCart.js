import React, { useContext, useEffect } from 'react';
import {TasksContext} from './TasksContext';
import TaskCartCard from '../components/TaskCartCard';


const TaskCart = ({ user }) => {
    const [tasks, setTasks] = useContext(TasksContext);

    return(
        <div>
            {/* <div>My Tasks ({taskCart.length})</div> */}
            <div>My Tasks </div>
            <div>{tasks.filter(t=>t.status==='in-progress').map((task,index)=>(
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
