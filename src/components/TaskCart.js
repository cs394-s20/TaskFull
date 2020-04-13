import React, { useContext } from 'react';
import {TaskCartContext} from '../components/TaskCartContext';
import TaskCartCard from '../components/TaskCartCard';


const TaskCart = () => {
    const [taskCart, setTaskCart] = useContext(TaskCartContext);
    //console.log(taskCart);
    const handleComplete = id => {
        const newTaskCart = [...taskCart];
        newTaskCart.find(t => t.id === id).status = 'complete';
        setTaskCart(newTaskCart);
        console.log('handleComplete called');
      }
    const myTasks = taskCart.map((task,index)=> 
    <TaskCartCard 
        key={task.id}
        task={task} 
        index={index}
        class={task.status}
        handleComplete={handleComplete}
        >
            {task.title}
    </TaskCartCard>)
  
    return(
        <div>
            <div>My Tasks: </div>
            <div>{myTasks}</div>
        </div>
    )
}

export default TaskCart;