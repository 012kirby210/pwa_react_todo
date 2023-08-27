import { useContext, useState} from "react";
import {TasksDispatchContext} from "./TasksContext.jsx";

const AddTask = () => {
    const [ text, setText ] = useState('');
    const { handleAddTask } = useContext(TasksDispatchContext)
    return(
        <>
            <input id="add-task-input" placeholder="Add text"
                   value={text}
                   onChange={event =>setText(event.target.value)}
                   />
            <button id="add-task-button" onClick={ event => {
                setText('');
                handleAddTask(text);

            }}>Add</button>
        </>
    )
}

export default AddTask;