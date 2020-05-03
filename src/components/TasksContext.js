import React, {useState, createContext} from 'react';

export const TasksContext = createContext();

export const TasksProvider = (props) =>{
    const [tasks, setTasks] = useState([]);
    // const [completeList, setCompleteList]=useState([]);

    return(
        <TasksContext.Provider value={[tasks, setTasks]}>
        { props.children }
        </TasksContext.Provider>
    )
}

