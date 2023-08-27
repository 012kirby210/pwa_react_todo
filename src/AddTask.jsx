import {createContext, useContext, useState} from "react";
import {TasksDispatchContext} from "./TasksContext.jsx";

let nextId=3;

const AddTask = () => {
    const [ text, setText ] = useState('');
    const dispatch = useContext(TasksDispatchContext)
    return(
        <>
            <input id="add-task-input" placeholder="Add text"
                   value={text}
                   onChange={event =>setText(event.target.value)}
                   />
            <button id="add-task-button" onClick={ event => {
                setText('');
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: text
                })
            }}>Add</button>
        </>
    )
}

export default AddTask;