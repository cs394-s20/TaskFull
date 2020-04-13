import React, {useState, createContext} from 'react';

export const TaskCartContext = createContext();

export const TaskCartProvider = (props) =>{
    const [taskCart, setTaskCart] = useState([]);
    const [completeList, setCompleteList]=useState([]);

    return(
        <TaskCartContext.Provider value={[taskCart, setTaskCart], [completeList, setCompleteList]}>
        { props.children }
        </TaskCartContext.Provider>
    )
}