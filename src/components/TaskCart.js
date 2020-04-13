import React, { useContext } from 'react';
import {TaskCartContext} from '../components/TaskCartContext';
import TaskCartCard from '../components/TaskCartCard';
import Button from '@material-ui/core/Button';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const TaskCart = () => {
    const [taskCart, setTaskCart] = useContext(TaskCartContext);

    const queueRef = React.useRef([]);
    //console.log(taskCart);
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setOpen(true);
        }
    };

    const handleComplete = id => {
        const newTaskCart = [...taskCart];
        console.log(newTaskCart)
        newTaskCart.find(t => t.id === id).status = 'complete';
        setTaskCart(newTaskCart);
        console.log('handleComplete called');

        console.log(taskCart)
        queueRef.current.push({
            id,
            key: new Date().getTime(),
        });

        if (open) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpen(false);
        } else {
            processQueue();
        }
    };

    const handleUndoSnack = (event, reason) => {
        console.log('handleUndoSnack called');
        setOpen(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExitSnack = () => {
        processQueue();
    };

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
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                onExited={handleExitSnack}
                message='Task Completed'
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleUndoSnack}>
                            UNDO
                        </Button>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnack}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

export default TaskCart;