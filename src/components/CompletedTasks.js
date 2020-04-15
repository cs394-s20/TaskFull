import React, {useContext} from 'react';
import {TaskCartContext} from '../components/TaskCartContext';
import TaskCartCard from '../components/TaskCartCard';

const CompletedTasks = () =>{
    const [completeList, setCompleteList] = useContext(TaskCartContext);


    const filteredList = completeList.filter(t=>t.status==='complete');
    //NOTE: completeList has duplicates of tasks, uniqueList seems to be a temporary work around

    const uniqueList =Array.from(new Set(filteredList.map(a=>a.id))).map(id=>{
        return filteredList.find(a=>a.id===id)
    });

    return(
        <div>
            <div>My Completed Tasks: </div>


            { <div>{uniqueList.filter(t=>t.status==='complete').map((task,index)=>(
                <TaskCartCard
                key={task.id}
                task={task}
                index={index}
                class={task.status}

                >
                    {task.title}
            </TaskCartCard>))}</div> }
            <div>{uniqueList.length}</div>

        </div>
    )
}

export default CompletedTasks;
