import React, {useContext} from 'react';
import {TaskCartContext} from '../components/TaskCartContext';

const CompletedTasks = () =>{
    const [completeList, setCompleteList] = useContext(TaskCartContext);
    
    return(
        <div>
            <div>My Completed Tasks: {completeList.length}</div>
            
        </div>
    )
}

export default CompletedTasks;