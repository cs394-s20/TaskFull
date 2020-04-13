import React, {useContext} from 'react';
import {TaskCartContext} from '../components/TaskCartContext';
import TaskCartCard from '../components/TaskCartCard';

const CompletedTasks = () =>{
    const [completeList, setCompleteList] = useContext(TaskCartContext);
    console.log(completeList);


    const filteredList = completeList.filter(t=>t.status==='complete');
    const uniqueList =Array.from(new Set(filteredList.map(a=>a.id))).map(id=>{
        return filteredList.find(a=>a.id===id)
    });

    return(
        <div>
            <div>My Completed Tasks: </div>
                
            
            { <div>{completeList.filter(t=>t.status==='complete').map((task,index)=>(
                <TaskCartCard 
                key={task.id}
                task={task} 
                index={index}
                class={task.status}
                
                >
                    {task.title}
            </TaskCartCard>))}</div> }
            <div>{completeList.length}</div>
            
        </div>
    )
}

export default CompletedTasks;