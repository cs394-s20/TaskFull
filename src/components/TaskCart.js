import React, { useContext } from 'react';
import {TaskCartContext} from '../components/TaskCartContext';
import TaskCartCard from '../components/TaskCartCard';


const TaskCart = ({ user }) => {
    const [taskCart, setTaskCart] = useContext(TaskCartContext);
    const handleComplete = id => {
        const newTaskCart = [...taskCart];
        newTaskCart.find(t => t.id === id).status = 'complete';
        setTaskCart(newTaskCart);
      }

    // const db = firebase.database().ref()
    // const acceptedasks = db.child('users/' + user.uid + '/to_do/').filter(t => t).id = 'in-progress';

    return(
        <div>
            <div>My Tasks ({taskCart.length})</div>
            <div>{taskCart.filter(t=>t.status==='in-progress').map((task,index)=>(
                <TaskCartCard
                key={task.id}
                task={task}
                index={index}
                class={task.status}
                handleComplete={handleComplete}
                >
                    {task.title}
            </TaskCartCard>)
            )}</div>
        </div>
    )
}

export default TaskCart;
