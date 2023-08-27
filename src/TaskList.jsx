import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.jsx';

const TaskList = () => {
    const tasks = useContext(TasksContext);
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

const Task = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContext);
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    type="text"
                    value={task.text}
                    onChange={e => {
                        dispatch({
                            type: 'changed',
                            task: {
                                ...task,
                                text: e.target.value
                            }
                        });
                    }} />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                <span>{task.text}</span>
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    });
                }}
            />
            {taskContent}
            <button onClick={() => {
                dispatch({
                    type: 'deleted',
                    id: task.id
                });
            }}>
                Delete
            </button>
        </label>
    );
}

export default TaskList;