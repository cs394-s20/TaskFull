import React, {useState} from 'react';

export const TaskCartContext = React.createContext();

export const TaskCartProvider = (props) =>{
    const [taskCart, setTaskCart] = useState([]);

    return(
        <TaskCartContext.Provider value={[taskCart, setTaskCart]}>
        { props.children }
        </TaskCartContext.Provider>
    )
}